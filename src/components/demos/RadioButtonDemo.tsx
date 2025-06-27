import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { RadioButton } from "@/components/mdui/radio-button"

export function RadioButtonDemo() {
  const [value, setValue] = React.useState("option1")

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Radio Button Demo</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">选择你的偏好</h3>
        
        <RadioGroupPrimitive.Root
          value={value}
          onValueChange={setValue}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3">
            <RadioButton value="option1" id="option1" />
            <label htmlFor="option1" className="text-sm font-medium">
              选项 1
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <RadioButton value="option2" id="option2" />
            <label htmlFor="option2" className="text-sm font-medium">
              选项 2
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <RadioButton value="option3" id="option3" />
            <label htmlFor="option3" className="text-sm font-medium">
              选项 3
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <RadioButton value="option4" id="option4" disabled />
            <label htmlFor="option4" className="text-sm font-medium opacity-50">
              禁用选项
            </label>
          </div>
        </RadioGroupPrimitive.Root>
        
        <p className="text-sm text-gray-600">
          当前选择: {value}
        </p>
      </div>
    </div>
  )
}
