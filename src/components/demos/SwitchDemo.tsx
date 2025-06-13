import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Switch } from '@/components/mdui/switch';

export default function SwitchDemo() {
  const [basicChecked, setBasicChecked] = useState(false);
  const [iconChecked, setIconChecked] = useState(true);
  const [controlledChecked, setControlledChecked] = useState(false);
  const [customChecked, setCustomChecked] = useState(false);

  return (
    <div className="p-8 space-y-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-on-surface mb-2">Switch Component</h1>
        <p className="text-on-surface-variant mb-8">
          Switch component is used to toggle the on/off state of a single option, following Material Design 3 design specifications.
        </p>

        {/* Basic Usage */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium text-on-surface mb-4">Basic Usage</h2>
            <p className="text-on-surface-variant mb-6">
              The simplest switch usage, supports both uncontrolled and controlled modes.
            </p>
          </div>

          <div className="bg-surface-container rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Switch />
              <span className="text-on-surface">Default switch</span>
            </div>

            <div className="flex items-center gap-4">
              <Switch defaultChecked />
              <span className="text-on-surface">Default checked</span>
            </div>

            <div className="flex items-center gap-4">
              <Switch 
                checked={basicChecked} 
                onCheckedChange={setBasicChecked}
              />
              <span className="text-on-surface">
                Controlled switch ({basicChecked ? 'On' : 'Off'})
              </span>
            </div>
          </div>
        </section>

        {/* Switches with Icons */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium text-on-surface mb-4">Switches with Icons</h2>
            <p className="text-on-surface-variant mb-6">
              Custom icons can be displayed in switches through the checkedIcon and uncheckedIcon properties.
            </p>
          </div>

          <div className="bg-surface-container rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Switch 
                checkedIcon={<Check size={16} />} 
                uncheckedIcon={<X size={16} />} 
              />
              <span className="text-on-surface">Switch with icons</span>
            </div>

            <div className="flex items-center gap-4">
              <Switch 
                checkedIcon={<Check size={16} />} 
                uncheckedIcon={<X size={16} />}
                checked={iconChecked} 
                onCheckedChange={setIconChecked}
              />
              <span className="text-on-surface">
                Icon switch ({iconChecked ? '✓ On' : '✗ Off'})
              </span>
            </div>
          </div>
        </section>

        {/* Disabled State */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium text-on-surface mb-4">Disabled State</h2>
            <p className="text-on-surface-variant mb-6">
              The switch can be disabled through the disabled property, making it non-interactive when disabled.
            </p>
          </div>

          <div className="bg-surface-container rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Switch disabled />
              <span className="text-on-surface opacity-60">Disabled state (off)</span>
            </div>

            <div className="flex items-center gap-4">
              <Switch disabled defaultChecked />
              <span className="text-on-surface opacity-60">Disabled state (on)</span>
            </div>

            <div className="flex items-center gap-4">
              <Switch 
                disabled 
                checkedIcon={<Check size={16} />} 
                uncheckedIcon={<X size={16} />} 
              />
              <span className="text-on-surface opacity-60">Disabled state (with icons)</span>
            </div>

            <div className="flex items-center gap-4">
              <Switch 
                disabled 
                checkedIcon={<Check size={16} />} 
                uncheckedIcon={<X size={16} />} 
                defaultChecked 
              />
              <span className="text-on-surface opacity-60">Disabled state (with icons, checked)</span>
            </div>
          </div>
        </section>

        {/* Accessibility Support */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium text-on-surface mb-4">Accessibility Support</h2>
            <p className="text-on-surface-variant mb-6">
              Switch component supports ARIA attributes, providing good screen reader support.
            </p>
          </div>

          <div className="bg-surface-container rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Switch aria-label="Enable notifications" />
              <span className="text-on-surface">Enable notifications</span>
            </div>

            <div className="flex items-center gap-4">
              <Switch 
                checkedIcon={<Check size={16} />} 
                uncheckedIcon={<X size={16} />}
                aria-label="Dark mode switch"
                checked={controlledChecked}
                onCheckedChange={setControlledChecked}
              />
              <span className="text-on-surface">Dark mode</span>
            </div>

            <div className="space-y-2">
              <label id="settings-label" className="text-on-surface font-medium">
                Advanced settings
              </label>
              <div className="flex items-center gap-4">
                <Switch 
                  aria-labelledby="settings-label"
                  defaultChecked
                />
                <span className="text-on-surface-variant">
                  Associate labels using aria-labelledby
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Styles */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium text-on-surface mb-4">Custom Styles</h2>
            <p className="text-on-surface-variant mb-6">
              Custom styles can be added through the className property.
            </p>
          </div>

          <div className="bg-surface-container rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Switch 
                className="scale-125"
                checked={customChecked}
                onCheckedChange={setCustomChecked}
              />
              <span className="text-on-surface">Enlarged switch</span>
            </div>

            <div className="flex items-center gap-4">
              <Switch 
                className="opacity-75"
                checkedIcon={<Check size={16} />} 
                uncheckedIcon={<X size={16} />}
                defaultChecked
              />
              <span className="text-on-surface">Semi-transparent switch</span>
            </div>
          </div>
        </section>

        {/* Use Case Examples */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium text-on-surface mb-4">Use Case Examples</h2>
            <p className="text-on-surface-variant mb-6">
              Common use cases for switches in real applications.
            </p>
          </div>

          <div className="bg-surface-container rounded-lg p-6">
            <div className="space-y-8">
              {/* Settings Panel */}
              <div>
                <h3 className="text-lg font-medium text-on-surface mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Push notifications', defaultChecked: true },
                    { label: 'Email notifications', defaultChecked: false },
                    { label: 'SMS notifications', defaultChecked: false },
                    { label: 'Sound alerts', defaultChecked: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-on-surface">{item.label}</span>
                      <Switch defaultChecked={item.defaultChecked} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Switches */}
              <div>
                <h3 className="text-lg font-medium text-on-surface mb-4">Feature Switches</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Auto save', defaultChecked: true, hasIcon: true },
                    { label: 'Data sync', defaultChecked: true, hasIcon: true },
                    { label: 'Offline mode', defaultChecked: false, hasIcon: true },
                    { label: 'Developer mode', defaultChecked: false, disabled: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className={`text-on-surface ${item.disabled ? 'opacity-60' : ''}`}>
                        {item.label}
                      </span>
                      <Switch 
                        defaultChecked={item.defaultChecked}
                        checkedIcon={item.hasIcon ? <Check size={16} /> : undefined}
                        uncheckedIcon={item.hasIcon ? <X size={16} /> : undefined}
                        disabled={item.disabled}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Keyboard Operation */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium text-on-surface mb-4">Keyboard Operation</h2>
            <p className="text-on-surface-variant mb-6">
              Switch component supports keyboard operation, providing good accessibility.
            </p>
          </div>

          <div className="bg-surface-container rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Switch />
                <span className="text-on-surface">Use Tab to focus, Space or Enter to toggle</span>
              </div>
              <div className="text-sm text-on-surface-variant ml-14">
                <p>• <kbd className="px-2 py-1 bg-surface-variant rounded text-xs">Tab</kbd> - Focus on switch</p>
                <p>• <kbd className="px-2 py-1 bg-surface-variant rounded text-xs">Space</kbd> or <kbd className="px-2 py-1 bg-surface-variant rounded text-xs">Enter</kbd> - Toggle switch state</p>
              </div>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium text-on-surface mb-4">API Reference</h2>
          </div>

          <div className="bg-surface-container rounded-lg p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="text-left py-3 px-4 text-on-surface font-medium">Property</th>
                  <th className="text-left py-3 px-4 text-on-surface font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-on-surface font-medium">Default</th>
                  <th className="text-left py-3 px-4 text-on-surface font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-on-surface-variant">
                <tr className="border-b border-outline-variant/50">
                  <td className="py-3 px-4 font-mono">checked</td>
                  <td className="py-3 px-4">boolean</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Switch state in controlled mode</td>
                </tr>
                <tr className="border-b border-outline-variant/50">
                  <td className="py-3 px-4 font-mono">defaultChecked</td>
                  <td className="py-3 px-4">boolean</td>
                  <td className="py-3 px-4">false</td>
                  <td className="py-3 px-4">Default state in uncontrolled mode</td>
                </tr>
                <tr className="border-b border-outline-variant/50">
                  <td className="py-3 px-4 font-mono">disabled</td>
                  <td className="py-3 px-4">boolean</td>
                  <td className="py-3 px-4">false</td>
                  <td className="py-3 px-4">Whether to disable the switch</td>
                </tr>
                <tr className="border-b border-outline-variant/50">
                  <td className="py-3 px-4 font-mono">checkedIcon</td>
                  <td className="py-3 px-4">React.ReactNode</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Icon displayed when checked</td>
                </tr>
                <tr className="border-b border-outline-variant/50">
                  <td className="py-3 px-4 font-mono">uncheckedIcon</td>
                  <td className="py-3 px-4">React.ReactNode</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Icon displayed when unchecked</td>
                </tr>
                <tr className="border-b border-outline-variant/50">
                  <td className="py-3 px-4 font-mono">onChange</td>
                  <td className="py-3 px-4">(checked: boolean) =&gt; void</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Callback function when state changes</td>
                </tr>
                <tr className="border-b border-outline-variant/50">
                  <td className="py-3 px-4 font-mono">className</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Custom CSS class name</td>
                </tr>
                <tr className="border-b border-outline-variant/50">
                  <td className="py-3 px-4 font-mono">aria-label</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Accessibility label</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono">aria-labelledby</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">ID of associated label element</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
} 