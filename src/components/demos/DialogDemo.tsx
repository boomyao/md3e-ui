import React from 'react'
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogClose 
} from '@/components/mdui/dialog'
import { Button } from '@/components/mdui/button'

export function DialogDemo() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">UI Dialog Component</h1>
        <p className="text-lg text-on-surface/70">
          Material Design 3 dialog component with smooth animations and accessibility support.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Basic Dialog</DialogTitle>
                  <DialogDescription>
                    This is a basic dialog example with title and description.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="text">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="bg-surface border border-outline rounded p-4">
          <pre className="text-sm overflow-x-auto">
{`<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Basic Dialog</DialogTitle>
      <DialogDescription>
        This is a basic dialog example.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="text">Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          </pre>
        </div>
      </section>

      {/* Confirmation Dialog */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Confirmation Dialog</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outlined">Delete Item</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this item? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button variant="text">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="filled" onClick={() => alert('Item deleted!')}>
                      Delete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="bg-surface border border-outline rounded p-4">
          <pre className="text-sm overflow-x-auto">
{`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outlined">Delete Item</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this item?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="gap-2">
      <DialogClose asChild>
        <Button variant="text">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="filled">Delete</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          </pre>
        </div>
      </section>

      {/* Information Dialog */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Information Dialog</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="tonal">Show Info</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Application Information</DialogTitle>
                  <DialogDescription>
                    This application follows Material Design 3 guidelines and provides 
                    a modern, accessible user interface with smooth animations and 
                    consistent design patterns.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-on-surface/60">Version:</span>
                      <span>1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface/60">Build:</span>
                      <span>2024.01.15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface/60">Framework:</span>
                      <span>React + TypeScript</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="filled">Got it</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="bg-surface border border-outline rounded p-4">
          <pre className="text-sm overflow-x-auto">
{`<Dialog>
  <DialogTrigger asChild>
    <Button variant="tonal">Show Info</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Application Information</DialogTitle>
      <DialogDescription>
        Detailed information about the application...
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Custom content */}
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="filled">Got it</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          </pre>
        </div>
      </section>

      {/* Form Dialog */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Form Dialog</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="elevated">Add User</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Enter the user details below to create a new account.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      id="name"
                      className="px-3 py-2 border border-outline rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="px-3 py-2 border border-outline rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="role" className="text-sm font-medium">
                      Role
                    </label>
                    <select
                      id="role"
                      className="px-3 py-2 border border-outline rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="guest">Guest</option>
                    </select>
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button variant="text">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="filled" onClick={() => alert('User added!')}>
                      Add User
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="bg-surface border border-outline rounded p-4">
          <pre className="text-sm overflow-x-auto">
{`<Dialog>
  <DialogTrigger asChild>
    <Button variant="elevated">Add User</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New User</DialogTitle>
      <DialogDescription>
        Enter the user details below.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* Form fields */}
    </div>
    <DialogFooter className="gap-2">
      <DialogClose asChild>
        <Button variant="text">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="filled">Add User</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          </pre>
        </div>
      </section>

      {/* Custom Styled Dialog */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Custom Styled Dialog</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="flex gap-4">
            <Dialog open={false}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Custom Dialog
                </Button>
              </DialogTrigger>
              <DialogContent className="border-2 border-purple-200">
                <DialogHeader>
                  <DialogTitle className="text-purple-700">
                    Custom Styled Dialog
                  </DialogTitle>
                  <DialogDescription className="text-purple-600">
                    This dialog demonstrates custom styling with purple theme colors.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-700">
                      You can customize the dialog appearance by adding custom classes
                      to any of the dialog components.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="text" className="text-purple-600">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="bg-surface border border-outline rounded p-4">
          <pre className="text-sm overflow-x-auto">
{`<Dialog>
  <DialogTrigger asChild>
    <Button className="bg-purple-600 hover:bg-purple-700">
      Custom Dialog
    </Button>
  </DialogTrigger>
  <DialogContent className="border-2 border-purple-200">
    <DialogHeader>
      <DialogTitle className="text-purple-700">
        Custom Styled Dialog
      </DialogTitle>
      <DialogDescription className="text-purple-600">
        Custom description with purple theme.
      </DialogDescription>
    </DialogHeader>
    {/* Custom content */}
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="text" className="text-purple-600">
          Close
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          </pre>
        </div>
      </section>
    </div>
  )
}
