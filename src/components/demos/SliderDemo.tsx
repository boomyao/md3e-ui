"use client"

import React, { useState } from "react"
import { Slider } from "@/components/mdui/slider"

export default function SliderDemo() {
  const [basicValue, setBasicValue] = useState(50)
  const [stepValue, setStepValue] = useState(25)
  const [rangeValue, setRangeValue] = useState(75)
  const [precisionValue, setPrecisionValue] = useState(2.5)

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Slider Component Demo</h1>
        <p className="text-gray-600">A slider component based on Material Design 3 specifications</p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Usage</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Current value: {basicValue}</p>
            <Slider 
              value={basicValue} 
              onChange={setBasicValue}
              min={0}
              max={100}
            />
          </div>
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Different Sizes</h2>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">XS (Extra Small)</p>
            <Slider 
              size="xs" 
              value={30} 
              onChange={() => {}}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">SM (Small, default)</p>
            <Slider 
              size="sm" 
              value={40} 
              onChange={() => {}}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">MD (Medium)</p>
            <Slider 
              size="md" 
              value={50} 
              onChange={() => {}}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">LG (Large)</p>
            <Slider 
              size="lg" 
              value={60} 
              onChange={() => {}}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">XL (Extra Large)</p>
            <Slider 
              size="xl" 
              value={70} 
              onChange={() => {}}
            />
          </div>
        </div>
      </section>

      {/* Step Control */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Step Control</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Step: 5, Current value: {stepValue}
            </p>
            <Slider 
              value={stepValue} 
              onChange={setStepValue}
              min={0}
              max={100}
              step={5}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Step: 0.1, Current value: {precisionValue}
            </p>
            <Slider 
              value={precisionValue} 
              onChange={setPrecisionValue}
              min={0}
              max={5}
              step={0.1}
            />
          </div>
        </div>
      </section>

      {/* Different Ranges */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Different Ranges</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Range: -50 to 50, Current value: {rangeValue}
            </p>
            <Slider 
              value={rangeValue} 
              onChange={setRangeValue}
              min={-50}
              max={50}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Range: 100 to 1000, Step: 50, Current value: 500
            </p>
            <Slider 
              value={500} 
              onChange={() => {}}
              min={100}
              max={1000}
              step={50}
            />
          </div>
        </div>
      </section>

      {/* Tick Indicators */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tick Indicators</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              With tick indicators, Step: 10, Current value: {stepValue}
            </p>
            <Slider 
              value={stepValue} 
              onChange={setStepValue}
              min={0}
              max={100}
              step={10}
              ticks={true}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Without tick indicators, Same configuration
            </p>
            <Slider 
              value={stepValue} 
              onChange={setStepValue}
              min={0}
              max={100}
              step={10}
              ticks={false}
              size="md"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Small step ticks, Step: 5
            </p>
            <Slider 
              value={25} 
              onChange={() => {}}
              min={0}
              max={50}
              step={5}
              ticks={true}
              size="sm"
            />
          </div>
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled State</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Disabled state</p>
            <Slider 
              value={30} 
              onChange={() => {}}
              disabled
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Disabled state - With steps and ticks</p>
            <Slider 
              value={60} 
              onChange={() => {}}
              step={10}
              ticks={true}
              disabled
            />
          </div>
        </div>
      </section>

      {/* Real Application Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real Application Examples</h2>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-medium mb-2">🔊 Volume Control</h3>
            <p className="text-sm text-gray-600 mb-2">Volume: {basicValue}%</p>
            <Slider 
              value={basicValue} 
              onChange={setBasicValue}
              min={0}
              max={100}
              size="md"
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-2">🌡️ Temperature Setting</h3>
            <p className="text-sm text-gray-600 mb-2">Temperature: {stepValue}°C</p>
            <Slider 
              value={stepValue} 
              onChange={setStepValue}
              min={16}
              max={30}
              step={1}
              size="md"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">⚡ Brightness Adjustment</h3>
            <p className="text-sm text-gray-600 mb-2">Brightness: {Math.round(precisionValue * 20)}%</p>
            <Slider 
              value={precisionValue} 
              onChange={setPrecisionValue}
              min={0}
              max={5}
              step={0.1}
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usage Instructions</h2>
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-medium mb-3">Keyboard Shortcuts</h3>
          <ul className="space-y-1 text-sm">
            <li>• <kbd className="px-2 py-1 bg-white rounded border">←</kbd> / <kbd className="px-2 py-1 bg-white rounded border">↓</kbd> Decrease value</li>
            <li>• <kbd className="px-2 py-1 bg-white rounded border">→</kbd> / <kbd className="px-2 py-1 bg-white rounded border">↑</kbd> Increase value</li>
            <li>• <kbd className="px-2 py-1 bg-white rounded border">Home</kbd> Jump to minimum value</li>
            <li>• <kbd className="px-2 py-1 bg-white rounded border">End</kbd> Jump to maximum value</li>
          </ul>
          
          <h3 className="font-medium mb-3 mt-6">Component Features</h3>
          <ul className="space-y-1 text-sm">
            <li>• <strong>Sizes:</strong> Five sizes available - xs, sm (default), md, lg, xl</li>
            <li>• <strong>Tick Indicators:</strong> Control step ticks display via ticks property</li>
            <li>• <strong>Step Control:</strong> Supports any numeric step value, including decimals</li>
            <li>• <strong>Range Setting:</strong> Customizable minimum and maximum values</li>
            <li>• <strong>Disabled State:</strong> Supports interaction disabling</li>
          </ul>
          
          <h3 className="font-medium mb-3 mt-6">Interactive Features</h3>
          <ul className="space-y-1 text-sm">
            <li>• Click anywhere on the track to jump to that value</li>
            <li>• Drag the slider handle to adjust value</li>
            <li>• Shows current value tooltip while pressed</li>
            <li>• Supports step alignment</li>
            <li>• Full accessibility support</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
