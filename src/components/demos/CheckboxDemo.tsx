import React, { useState } from 'react'
import { Checkbox } from '@/components/mdui/checkbox'
import type { CheckedState } from '@radix-ui/react-checkbox'

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false)
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: true,
    item3: false,
  })

  const handleCheckedChange = (itemName: string) => (checked: CheckedState) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: checked === true
    }))
  }

  const handleControlledChange = (checked: CheckedState) => {
    setChecked(checked === true)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Checkbox Component</h1>
        <p className="text-lg text-on-surface/70">
          Material Design 3 style checkbox component, supports checked, unchecked and indeterminate states.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="basic-1" />
              <label htmlFor="basic-1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Unchecked
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="basic-2" defaultChecked />
              <label htmlFor="basic-2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Checked
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="controlled"
                checked={checked}
                onCheckedChange={handleControlledChange}
              />
              <label htmlFor="controlled" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Controlled ({checked ? 'Checked' : 'Unchecked'})
              </label>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-outline rounded p-4">
          <pre className="text-sm overflow-x-auto">
{`<Checkbox id="basic-1" />
<Checkbox id="basic-2" defaultChecked />
<Checkbox
  id="controlled"
  checked={checked}
  onCheckedChange={setChecked}
/>`}
          </pre>
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Disabled State</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-1" disabled />
              <label htmlFor="disabled-1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Disabled Unchecked
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-2" disabled defaultChecked />
              <label htmlFor="disabled-2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Disabled Checked
              </label>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-outline rounded p-4">
          <pre className="text-sm overflow-x-auto">
{`<Checkbox id="disabled-1" disabled />
<Checkbox id="disabled-2" disabled defaultChecked />`}
          </pre>
        </div>
      </section>

      {/* Error State */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Error State</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <form className="space-y-4">
            <p className="text-sm text-on-surface/70 mb-4">
              Error state is automatically triggered by HTML5 validation, displayed using the :user-invalid pseudo-class.
            </p>
            <div className="flex items-center space-x-2">
              <Checkbox id="error-1" required />
              <label htmlFor="error-1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Required checkbox (shows error state when unchecked)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="error-2" required defaultChecked />
              <label htmlFor="error-2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Required checkbox (checked)
              </label>
            </div>
            <p className="text-xs text-on-surface/50">
              * Error state will automatically display when form validation fails
            </p>
          </form>
        </div>
        <div className="bg-surface border border-outline rounded p-4">
          <pre className="text-sm overflow-x-auto">
{`<form>
  <Checkbox id="required-checkbox" required />
  <label htmlFor="required-checkbox">Required checkbox</label>
</form>`}
          </pre>
        </div>
      </section>

      {/* List Form */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">List Form</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="space-y-4 max-w-md">
            <h3 className="text-lg font-medium mb-4">Choose your hobbies:</h3>
            {[
              { id: 'hobby-1', label: 'Reading', key: 'item1' },
              { id: 'hobby-2', label: 'Music', key: 'item2' },
              { id: 'hobby-3', label: 'Sports', key: 'item3' },
            ].map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-2 rounded hover:bg-surface-variant">
                <Checkbox
                  id={item.id}
                  checked={checkedItems[item.key as keyof typeof checkedItems]}
                  onCheckedChange={handleCheckedChange(item.key)}
                />
                <label
                  htmlFor={item.id}
                  className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {item.label}
                </label>
              </div>
            ))}
            <div className="mt-4 p-3 bg-surface border border-outline rounded text-sm">
              <strong>Selected:</strong>
              {Object.entries(checkedItems)
                .filter(([, checked]) => checked)
                .map(([key]) => {
                  const labels = { item1: 'Reading', item2: 'Music', item3: 'Sports' }
                  return labels[key as keyof typeof labels]
                })
                .join(', ') || 'None'}
            </div>
          </div>
        </div>
        <div className="bg-surface border border-outline rounded p-4">
          <pre className="text-sm overflow-x-auto">
{`const [checkedItems, setCheckedItems] = useState({
  item1: false,
  item2: true,
  item3: false,
})

const handleCheckedChange = (itemName: string) => (checked: boolean) => {
  setCheckedItems(prev => ({ ...prev, [itemName]: checked }))
}

// Rendering
{items.map(item => (
  <div key={item.id} className="flex items-center space-x-3">
    <Checkbox
      id={item.id}
      checked={checkedItems[item.key]}
      onCheckedChange={handleCheckedChange(item.key)}
    />
    <label htmlFor={item.id}>{item.label}</label>
  </div>
))}`}
          </pre>
        </div>
      </section>

      {/* Indeterminate State */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Indeterminate State</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="space-y-4 max-w-md">
            <div className="flex items-center space-x-3 p-2 rounded">
              <Checkbox
                id="indeterminate"
                checked="indeterminate"
              />
              <label htmlFor="indeterminate" className="text-sm font-medium leading-none">
                Select All (partially selected)
              </label>
            </div>
            <div className="ml-6 space-y-2">
              <div className="flex items-center space-x-3">
                <Checkbox id="sub1" defaultChecked />
                <label htmlFor="sub1" className="text-sm">Option 1</label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="sub2" />
                <label htmlFor="sub2" className="text-sm">Option 2</label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="sub3" defaultChecked />
                <label htmlFor="sub3" className="text-sm">Option 3</label>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-outline rounded p-4">
          <pre className="text-sm overflow-x-auto">
{`<Checkbox checked="indeterminate" />  {/* Indeterminate state */}`}
          </pre>
        </div>
      </section>
    </div>
  )
} 