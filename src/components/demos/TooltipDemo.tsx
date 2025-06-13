import React from "react"
import { Tooltip, TooltipTrigger, TooltipContent, RichTooltipContent } from "@/components/mdui/tooltip"

export default function TooltipDemo() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Tooltip Component Demo</h2>
        
        <div className="space-y-6">
          {/* Plain Tooltip Demo */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Plain Tooltip</h3>
            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="px-4 py-2 bg-primary text-on-primary rounded-md hover:bg-primary/90">
                    Hover for tooltip
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  This is a simple tooltip text
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="px-3 py-1 bg-secondary text-on-secondary rounded cursor-help">
                    Help icon
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  Click to get more help information
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Rich Tooltip Demo */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Rich Tooltip</h3>
            <div className="flex items-center gap-4">
              <Tooltip open>
                <TooltipTrigger asChild>
                  <button className="px-4 py-2 bg-tertiary text-on-tertiary rounded-md hover:bg-tertiary/90">
                    Delete action
                  </button>
                </TooltipTrigger>
                <RichTooltipContent
                  title="Confirm deletion"
                  confirmText="Confirm"
                  onConfirm={() => alert("Delete action confirmed")}
                >
                  This action will permanently delete the selected items and cannot be undone.
                </RichTooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="px-4 py-2 bg-surface text-on-surface border border-outline rounded-md hover:bg-surface-variant">
                    Settings
                  </button>
                </TooltipTrigger>
                <RichTooltipContent
                  title="Advanced Settings"
                  confirmText="Apply"
                  onConfirm={() => alert("Settings applied")}
                >
                  Modifying these settings may affect application performance and behavior.
                </RichTooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Different Positions */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Different Positions</h3>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="px-3 py-2 bg-surface text-on-surface border border-outline rounded">
                    Top
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Tooltip shown at top
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="px-3 py-2 bg-surface text-on-surface border border-outline rounded">
                    Right
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Tooltip shown at right
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="px-3 py-2 bg-surface text-on-surface border border-outline rounded">
                    Bottom
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Tooltip shown at bottom
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="px-3 py-2 bg-surface text-on-surface border border-outline rounded">
                    Left
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  Tooltip shown at left
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
