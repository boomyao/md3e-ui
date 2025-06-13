"use client"

import React, { useState } from "react"
import { TextField } from "@/components/mdui/text-field"
import { Mail, Search, Eye, EyeOff, User, Lock } from "lucide-react"

export function TextFieldDemo() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [textareaValue, setTextareaValue] = useState("")
  const [validationEmail, setValidationEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(true)

  const handleEmailValidation = (value: string) => {
    setValidationEmail(value)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsEmailValid(value === "" || emailRegex.test(value))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">TextField Demo</h1>
        <p className="text-muted-foreground">
          Material Design 3 text field component demo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Basic Styles</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Filled Variant</h3>
              <TextField
                variant="filled"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                supportingText="We will send confirmation information to this email"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Outlined Variant</h3>
              <TextField
                variant="outlined"
                label="Username"
                placeholder="Enter your username"
                supportingText="3-20 characters, can include letters, numbers and underscores"
              />
            </div>
          </div>
        </section>

        {/* With Icons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">With Icons</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Leading Icon</h3>
              <TextField
                variant="filled"
                label="Search"
                placeholder="Search content"
                leadingIcon={<Search className="w-4 h-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Trailing Icon</h3>
              <TextField
                variant="outlined"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                trailingIcon={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="p-1 hover:bg-surface-variant rounded-full transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
                supportingText="At least 8 characters"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Both Icons</h3>
              <TextField
                variant="filled"
                label="User Account"
                placeholder="Enter your account"
                leadingIcon={<User className="w-4 h-4" />}
                trailingIcon={<Lock className="w-4 h-4" />}
                supportingText="Secure user identifier"
              />
            </div>
          </div>
        </section>

        {/* States */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">State Demos</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Disabled State</h3>
              <TextField
                variant="filled"
                label="Disabled Field"
                value="Non-editable content"
                disabled
                supportingText="This field is disabled"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Error State</h3>
              <TextField
                variant="outlined"
                label="Email Validation"
                placeholder="Enter email to see validation"
                value={validationEmail}
                onChange={(e) => handleEmailValidation(e.target.value)}
                aria-invalid={!isEmailValid}
                leadingIcon={<Mail className="w-4 h-4" />}
                supportingText={
                  !isEmailValid 
                    ? "Please enter a valid email address" 
                    : "Enter a valid email address"
                }
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Multiline Text</h3>
              <TextField
                variant="outlined"
                label="Description"
                placeholder="Enter detailed description..."
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                rows={4}
                supportingText={`${textareaValue.length}/500 characters`}
              />
            </div>
          </div>
        </section>

        {/* Complex Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Complex Examples</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Login Form</h3>
              <div className="space-y-3">
                <TextField
                  variant="outlined"
                  label="Email"
                  placeholder="Enter your email"
                  leadingIcon={<Mail className="w-4 h-4" />}
                  supportingText="Email address for login"
                />
                <TextField
                  variant="outlined"
                  label="Password"
                  placeholder="Enter your password"
                  leadingIcon={<Lock className="w-4 h-4" />}
                  supportingText="Please enter your password"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Search Box</h3>
              <TextField
                variant="filled"
                label="Search Products"
                placeholder="Enter keywords to search..."
                leadingIcon={<Search className="w-4 h-4" />}
                supportingText="Supports fuzzy search"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Code Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage Examples</h2>
        <div className="bg-surface rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm">
            <code>{`// Basic usage
<TextField
  variant="filled"
  label="Email Address"
  placeholder="Enter your email"
  supportingText="Help text"
/>

// With icons
<TextField
  variant="outlined"
  label="Search"
  leadingIcon={<Search />}
  trailingIcon={<X />}
/>

// Error state
<TextField
  label="Email"
  aria-invalid={!isValid}
  supportingText={error ? "Error message" : "Help message"}
/>

// Disabled state
<TextField
  label="Disabled Field"
  disabled
  value="Disabled value"
/>`}</code>
          </pre>
        </div>
      </section>
    </div>
  )
}
