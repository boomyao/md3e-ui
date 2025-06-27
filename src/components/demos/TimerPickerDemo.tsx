import React from 'react';
import { TimePicker } from '@/components/mdui/timer-picker';

export function TimerPickerDemo() {
  const handleConfirm = (time: { hour: number; minute: number }) => {
    alert(`Time confirmed: ${time.hour}:${time.minute}`);
  };

  const handleCancel = () => {
    alert('Time selection cancelled');
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">TimePicker Component</h1>
        <p className="text-lg text-on-surface/70">
          A Material Design 3 inspired time picker for selecting hours and minutes,
          available in different layouts and formats.
        </p>
      </div>

      {/* Vertical Orientation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Vertical Layout</h2>
        <div className="bg-surface-variant rounded-lg p-6 flex flex-wrap gap-8 justify-center">
          <div>
            <h3 className="text-lg font-medium mb-3">12-Hour Format</h3>
            <TimePicker
              orientation="Vertical"
              format="12h"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">24-Hour Format</h3>
            <TimePicker
              orientation="Vertical"
              format="24h"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </section>

      {/* Horizontal Orientation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Horizontal Layout</h2>
        <div className="bg-surface-variant rounded-lg p-6 flex flex-wrap gap-8 justify-center">
          <div>
            <h3 className="text-lg font-medium mb-3">12-Hour Format</h3>
            <TimePicker
              orientation="Horizontal"
              format="12h"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">24-Hour Format</h3>
            <TimePicker
              orientation="Horizontal"
              format="24h"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </section>

      {/* Interactivity Guide */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">How to Use</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="space-y-4 text-on-surface/80">
            <p>
              - <strong>Select View:</strong> Click on the hour or minute display to switch between the clock views.
            </p>
            <p>
              - <strong>Set Time:</strong> Click on the numbers on the clock face to set the desired hour or minute.
            </p>
            <p>
              - <strong>AM/PM Toggle:</strong> In 12-hour format, use the AM/PM buttons to switch between morning and afternoon.
            </p>
            <p>
              - <strong>Confirm/Cancel:</strong> Use the "OK" and "Cancel" buttons to confirm your selection or close the picker.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
