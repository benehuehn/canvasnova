'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

const steps = [
  { id: 'format', title: 'Format' },
  { id: 'size', title: 'Size' },
  { id: 'material', title: 'Material' },
  { id: 'frame', title: 'Frame' },
  { id: 'shipping', title: 'Shipping' },
]

const formatOptions = [
  { id: '16:9', name: '16:9' },
  { id: '9:16', name: '9:16' },
  { id: 'square', name: 'Square' },
]

const sizeOptions = {
  '16:9': [
    { id: '16x9', name: '16 x 9 cm' },
    { id: '32x18', name: '32 x 18 cm' },
    { id: '48x27', name: '48 x 27 cm' },
    { id: '64x36', name: '64 x 36 cm' },
    { id: '80x45', name: '80 x 45 cm' },
    { id: '112x63', name: '112 x 63 cm' },
    { id: '128x72', name: '128 x 72 cm' },
    { id: '144x81', name: '144 x 81 cm' },
    { id: '160x90', name: '160 x 90 cm' },
    { id: '176x99', name: '176 x 99 cm' },
  ],
  '9:16': [
    { id: '9x16', name: '9 x 16 cm' },
    { id: '18x32', name: '18 x 32 cm' },
    { id: '27x48', name: '27 x 48 cm' },
    { id: '36x64', name: '36 x 64 cm' },
    { id: '45x80', name: '45 x 80 cm' },
    { id: '63x112', name: '63 x 112 cm' },
    { id: '72x128', name: '72 x 128 cm' },
    { id: '81x144', name: '81 x 144 cm' },
    { id: '90x160', name: '90 x 160 cm' },
    { id: '99x176', name: '99 x 176 cm' },
  ],
  'square': [
    { id: '10x10', name: '10 x 10 cm' },
    { id: '20x20', name: '20 x 20 cm' },
    { id: '30x30', name: '30 x 30 cm' },
    { id: '40x40', name: '40 x 40 cm' },
    { id: '50x50', name: '50 x 50 cm' },
    { id: '60x60', name: '60 x 60 cm' },
    { id: '80x80', name: '80 x 80 cm' },
    { id: '100x100', name: '100 x 100 cm' },
  ],
}

const materialOptions = [
  { id: 'acrylic', name: 'Acrylic Glass', price: 50, image: '/placeholder.svg?height=100&width=100' },
  { id: 'aluminum', name: 'Aluminum Dibond', price: 40, image: '/placeholder.svg?height=100&width=100' },
  { id: 'canvas', name: 'Canvas', price: 30, image: '/placeholder.svg?height=100&width=100' },
  { id: 'poster', name: 'Poster', price: 20, image: '/placeholder.svg?height=100&width=100' },
]

const frameOptions = [
  { id: 'none', name: 'No Frame', price: 0, image: '/placeholder.svg?height=100&width=100' },
  { id: 'black', name: 'Black Frame', price: 30, image: '/placeholder.svg?height=100&width=100' },
  { id: 'white', name: 'White Frame', price: 30, image: '/placeholder.svg?height=100&width=100' },
  { id: 'wood', name: 'Wood Frame', price: 40, image: '/placeholder.svg?height=100&width=100' },
]

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 10 },
  { id: 'express', name: 'Express Shipping', price: 25 },
]

export function WhitewallArtworkCustomizationComponent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState({
    format: '',
    size: '',
    material: '',
    frame: '',
    shipping: ''
  })
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    calculateTotalPrice()
  }, [selections])

  const calculateTotalPrice = () => {
    let price = 0
    if (selections.material) {
      price += materialOptions.find(m => m.id === selections.material)?.price || 0
    }
    if (selections.frame) {
      price += frameOptions.find(f => f.id === selections.frame)?.price || 0
    }
    if (selections.shipping) {
      price += shippingOptions.find(s => s.id === selections.shipping)?.price || 0
    }
    // Add size-based pricing logic here if needed
    setTotalPrice(price)
  }

  const handleSelection = (key: string, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }))
    if (key === 'format') {
      setSelections(prev => ({ ...prev, size: '' }))
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    const step = steps[currentStep]
    switch (step.id) {
      case 'format':
        return (
          <RadioGroup value={selections.format} onValueChange={(value) => handleSelection('format', value)}>
            {formatOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id}>{option.name}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case 'size':
        return (
          <Select value={selections.size} onValueChange={(value) => handleSelection('size', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {selections.format && sizeOptions[selections.format].map((option) => (
                <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case 'material':
        return (
          <RadioGroup value={selections.material} onValueChange={(value) => handleSelection('material', value)}>
            {materialOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-4 p-4 border rounded-lg mb-4">
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <div className="flex-grow">
                  <Label htmlFor={option.id} className="font-medium">{option.name}</Label>
                  <p className="text-sm font-semibold mt-2">Price: £{option.price.toFixed(2)}</p>
                </div>
                <Image src={option.image} alt={option.name} width={50} height={50} className="rounded-md" />
              </div>
            ))}
          </RadioGroup>
        )
      case 'frame':
        return (
          <RadioGroup value={selections.frame} onValueChange={(value) => handleSelection('frame', value)}>
            {frameOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-4 p-4 border rounded-lg mb-4">
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <div className="flex-grow">
                  <Label htmlFor={option.id} className="font-medium">{option.name}</Label>
                  <p className="text-sm font-semibold mt-2">Price: £{option.price.toFixed(2)}</p>
                </div>
                <Image src={option.image} alt={option.name} width={50} height={50} className="rounded-md" />
              </div>
            ))}
          </RadioGroup>
        )
      case 'shipping':
        return (
          <RadioGroup value={selections.shipping} onValueChange={(value) => handleSelection('shipping', value)}>
            {shippingOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-4 p-4 border rounded-lg mb-4">
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <div className="flex-grow">
                  <Label htmlFor={option.id} className="font-medium">{option.name}</Label>
                  <p className="text-sm font-semibold mt-2">Price: £{option.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8 font-sans" style={{ fontFamily: 'Syne, sans-serif' }}>
      <div className="w-full lg:w-1/2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Artwork Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Your artwork preview</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Selected Options</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {Object.entries(selections).map(([key, value]) => {
                if (!value) return null
                let displayValue = value
                let image = null
                if (key === 'material') {
                  const material = materialOptions.find(m => m.id === value)
                  displayValue = material?.name || value
                  image = material?.image
                } else if (key === 'frame') {
                  const frame = frameOptions.find(f => f.id === value)
                  displayValue = frame?.name || value
                  image = frame?.image
                }
                return (
                  <div key={key} className="flex items-center space-x-4 mb-4">
                    {image && <Image src={image} alt={displayValue} width={50} height={50} className="rounded-md" />}
                    <div>
                      <p className="font-medium capitalize">{key}</p>
                      <p className="text-sm text-gray-600">{displayValue}</p>
                    </div>
                  </div>
                )
              })}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full lg:w-1/2">
        <CardHeader>
          <CardTitle>Customize Your Whitewall Print</CardTitle>
          <CardDescription>Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button onClick={prevStep} disabled={currentStep === 0} variant="outline">Previous</Button>
            <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
          <div className="text-xl font-bold">
            Total: £{totalPrice.toFixed(2)}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}