import React from 'react'
import { Button } from '@/components/mdui/button'
import { IconButton } from '@/components/mdui/icon-button'
import { StarsIcon } from '@/components/mdui/icons'

export function ButtonDemo() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">UI Button Component</h1>
        <p className="text-lg text-on-surface/70">
          Clean and practical basic button component, providing common button styles and functions.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex gap-4">
            <Button>Default Button</Button>
            <Button onClick={() => alert('Button clicked')}>
              Click Me
            </Button>
          </div>
        </div>
      </section>

      {/* Button Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Button Variants</h2>
        <div className="rounded-lg p-6">
          <div className="flex flex-wrap gap-4">
            <Button variant="filled">Filled</Button>
            <Button variant="tonal">Tonal</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="elevated">Elevated</Button>
            <Button variant="text">Text</Button>
            <Button shape="round">Round</Button>
            <Button shape="square">Square</Button>
          </div>
        </div>
      </section>

      {/* Button Sizes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Button Sizes</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="xs">Small</Button>
            <Button size="sm">Default</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">XLarge</Button>
          </div>
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Disabled State</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled Button</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
            <Button variant="elevated" disabled>Disabled Secondary</Button>
            <Button variant="text" disabled>Disabled Ghost</Button>
          </div>
        </div>
      </section>

      {/* Buttons with Icons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Buttons with Icons</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex flex-wrap gap-4">
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Project
            </Button>
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 000-6.364 4.5 4.5 0 00-6.364 0L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favorite
            </Button>
            <Button variant="elevated">
              Download
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Icon Button</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex flex-wrap items-center gap-4">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
              <IconButton key={size} size={size as any} widthType="narrow" variant="filled">
                <StarsIcon />
              </IconButton>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
              <IconButton key={size} size={size as any} variant="filled">
                <StarsIcon />
              </IconButton>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
              <IconButton key={size} size={size as any} widthType="wide" variant="filled">
                <StarsIcon />
              </IconButton>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
              <IconButton key={size} size={size as any} widthType="wide" shape="square" variant="filled">
                <StarsIcon />
              </IconButton>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {['filled', 'tonal', 'outline', 'standard'].map((variant) => (
              <IconButton key={variant} variant={variant as any} widthType="wide" shape="round">
                <StarsIcon />
              </IconButton>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 