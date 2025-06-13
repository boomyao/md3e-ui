import React from "react"
import { Badge } from "@/components/mdui/badge"
import { Button } from "@/components/mdui/button"
import { Mail, Bell, ShoppingCart } from "lucide-react"

export default function BadgeDemo() {
  return (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Badge Component Demo</h2>
        <p className="text-muted-foreground">
          Badge component based on Material Design 3 specifications
        </p>
      </div>

      {/* Basic Usage */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Usage</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="outline" size="xs">
              <Mail className="h-4 w-4" />
            </Button>
            <Badge className="absolute -top-2 -right-2">3</Badge>
          </div>
          
          <div className="relative">
            <Button variant="outline" size="xs">
              <Bell className="h-4 w-4" />
            </Button>
            <Badge className="absolute -top-2 -right-2">12</Badge>
          </div>
          
          <div className="relative">
            <Button variant="outline" size="xs">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Badge className="absolute -top-2 -right-2">99+</Badge>
          </div>
        </div>
      </div>

      {/* Different Content */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Content</h3>
        <div className="flex items-center gap-4">
          <Badge>1</Badge>
          <Badge>9</Badge>
          <Badge>99</Badge>
          <Badge>999+</Badge>
          <Badge>New</Badge>
          <Badge>Hot</Badge>
        </div>
      </div>

      {/* Dot Badge */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dot Badge</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="outline" size="xs">
              <Mail className="h-4 w-4" />
            </Button>
            <Badge className="absolute -top-1 -right-1" />
          </div>
          
          <div className="relative">
            <Button variant="outline" size="xs">
              <Bell className="h-4 w-4" />
            </Button>
            <Badge className="absolute -top-1 -right-1" />
          </div>
        </div>
      </div>

      {/* With Text */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Text</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">Unread messages</span>
            <Badge>5</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Todo items</span>
            <Badge>12</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">New features</span>
            <Badge>New</Badge>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Styles</h3>
        <div className="flex items-center gap-4">
          <Badge className="bg-blue-500 text-white">Blue</Badge>
          <Badge className="bg-green-500 text-white">Green</Badge>
          <Badge className="bg-yellow-500 text-black">Yellow</Badge>
          <Badge className="bg-purple-500 text-white">Purple</Badge>
        </div>
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Code Examples</h3>
        <div className="bg-muted p-4 rounded-lg">
          <pre className="text-sm">
{`// Basic usage
<Badge>3</Badge>

// With button
<div className="relative">
  <Button variant="outline" size="icon">
    <Mail className="h-4 w-4" />
  </Button>
  <Badge className="absolute -top-2 -right-2">3</Badge>
</div>

// Dot badge
<Badge className="absolute -top-1 -right-1" />

// Custom color
<Badge className="bg-blue-500 text-white">Blue</Badge>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
