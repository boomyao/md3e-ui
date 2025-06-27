import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { IconButton } from './icon-button';
import { KeyboardIcon } from './icons';

const timePickerVariants = cva(
  'flex flex-col bg-surface-container-high rounded-[28px] overflow-hidden shadow-elevation-3',
  {
    variants: {
      orientation: {
        Horizontal: 'w-[572px] h-[384px]',
        Vertical: 'w-[328px] h-[520px]',
      },
    },
    defaultVariants: {
      orientation: 'Vertical',
    },
  }
);

const mainContentVariants = cva('flex-1 flex items-center px-6', {
  variants: {
    orientation: {
      Horizontal: 'flex-row justify-between gap-6',
      Vertical: 'flex-col justify-start gap-9 pt-5',
    },
  },
  defaultVariants: {
    orientation: 'Vertical',
  },
});

const timeInputContainerVariants = cva(
  'grid place-items-center w-full h-20 rounded-lg display-large cursor-pointer',
  {
    variants: {
      state: {
        selected: 'bg-primary-container text-on-primary-container',
        default: 'bg-surface-container-highest text-on-surface',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

const amPmContainerVariants = cva(
  'flex border border-outline rounded-lg overflow-hidden',
  {
    variants: {
      orientation: {
        Horizontal: 'flex-row',
        Vertical: 'flex-col',
      },
    },
    defaultVariants: {
      orientation: 'Vertical',
    },
  }
);

const amPmButtonVariants = cva(
  'w-[58px] h-10 grid place-items-center title-medium',
  {
    variants: {
      selected: {
        true: 'bg-tertiary-container text-on-tertiary-container',
        false: 'bg-transparent text-on-surface',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

const clockFaceVariants = cva(
  'relative w-64 h-64 bg-surface-container-highest rounded-full flex items-center justify-center',
);

const clockHandVariants = cva('absolute h-0.5 bg-primary', {
  variants: {
    level: {
      1: 'w-[80px]',
      2: 'w-[44px]',
    },
  },
  defaultVariants: {
    level: 1,
  },
});

const clockNumberVariants = cva(
  'absolute w-12 h-12 grid place-items-center rounded-full body-large transition-colors cursor-pointer',
  {
    variants: {
      state: {
        selected: 'bg-primary text-on-primary',
        default: 'text-on-surface',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export interface TimePickerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timePickerVariants> {
  format?: '12h' | '24h';
  onConfirm?: (time: { hour: number; minute: number }) => void;
  onCancel?: () => void;
}

const formatTime = (num: number) => num.toString().padStart(2, '0');

// 新增：独立的 ClockNumber 组件
type ClockNumberProps = {
  value: number;
  isSelected: boolean;
  radius: number;
  index: number;
  label?: string;
  onClick: (value: number) => void;
  formatTime?: (num: number) => string;
};

const ClockNumber: React.FC<ClockNumberProps> = ({
  value,
  isSelected,
  radius,
  index,
  label,
  onClick,
  formatTime = (num) => num.toString().padStart(2, '0'),
}) => {
  const rotation = index * 30 - 90;
  const adjustedRotation = rotation < 0 ? rotation + 360 : rotation;
  return (
    <div
      key={label ? `${label}-${value}` : value}
      className={cn(clockNumberVariants({ state: isSelected ? 'selected' : 'default' }))}
      style={{
        transform: `rotate(${adjustedRotation}deg) translate(${radius}px) rotate(-${adjustedRotation}deg)`,
      }}
      onClick={() => onClick(value)}
    >
      {formatTime(value)}
    </div>
  );
};

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      className,
      orientation = 'Vertical',
      format = '12h',
      onConfirm,
      onCancel,
      ...props
    },
    ref
  ) => {
    const [hour, setHour] = React.useState(10); // 0-23
    const [minute, setMinute] = React.useState(30);
    const [activeInput, setActiveInput] = React.useState<'hour' | 'minute'>('hour');

    const targetRotation = React.useMemo(() => {
      if (activeInput === 'hour') {
        const rotationHour = hour % 12;
        return rotationHour * 30;
      }
      return (minute / 5) * 30;
    }, [activeInput, hour, minute]);

    const [visualRotation, setVisualRotation] = React.useState(targetRotation);

    React.useEffect(() => {
      setVisualRotation(prevRotation => {
        const currentAngle = (prevRotation % 360 + 360) % 360;
        let diff = targetRotation - currentAngle;
    
        if (diff > 180) {
          diff -= 360;
        } else if (diff < -180) {
          diff += 360;
        }
    
        return prevRotation + diff;
      });
    }, [targetRotation]);

    const period = React.useMemo(() => (hour >= 12 ? 'PM' : 'AM'), [hour]);
    const displayHour = React.useMemo(() => {
      if (format === '12h') {
        if (hour === 0) return 12;
        if (hour > 12) return hour - 12;
      }
      return hour;
    }, [hour, format]);

    const handleHourChange = React.useCallback((newHour: number) => {
      if (format === '12h') {
        const isPM = period === 'PM';
        if (isPM) {
          setHour(newHour === 12 ? 12 : newHour + 12);
        } else {
          setHour(newHour === 12 ? 0 : newHour);
        }
      } else {
        setHour(newHour);
      }
    }, [format, period]);

    const handleMinuteChange = React.useCallback((newMinute: number) => {
      setMinute(newMinute);
    }, []);

    const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
      if (period !== newPeriod) {
        setHour(hour => (newPeriod === 'PM' ? (hour % 12) + 12 : hour % 12));
      }
    };

    const handleConfirm = () => {
      onConfirm?.({ hour, minute });
    };

    const ClockNumbers = React.useMemo(() => {
      if (activeInput === 'minute') {
        return Array.from({ length: 12 }, (_, i) => {
          const value = i * 5;
          return (
            <ClockNumber
              key={`minute-${value}`}
              value={value}
              isSelected={value === minute}
              radius={104}
              index={i}
              label="minute"
              onClick={handleMinuteChange}
              formatTime={formatTime}
            />
          );
        });
      }

      if (format === '12h') {
        return Array.from({ length: 12 }, (_, i) => {
          const value = i + 1;
          return (
            <ClockNumber
              key={`hour-${value}`}
              value={value}
              isSelected={value === displayHour}
              radius={104}
              index={value % 12}
              label="hour"
              onClick={handleHourChange}
              formatTime={formatTime}
            />
          );
        });
      }

      // 24小时制
      const outerHours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const innerHours = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

      return (
        <>
          {outerHours.map((value, i) => (
            <ClockNumber
              key={`outer-hour-${value}`}
              value={value}
              isSelected={value === hour}
              radius={104}
              index={i}
              label="outer-hour"
              onClick={handleHourChange}
              formatTime={formatTime}
            />
          ))}
          {innerHours.map((value, i) => (
            <ClockNumber
              key={`inner-hour-${value}`}
              value={value}
              isSelected={value === hour}
              radius={68}
              index={i}
              label="inner-hour"
              onClick={handleHourChange}
              formatTime={formatTime}
            />
          ))}
        </>
      );
    }, [activeInput, hour, minute, format, displayHour, handleHourChange, handleMinuteChange]);

    const handLevel = format === '24h' && activeInput === 'hour' && (hour === 0 || hour > 12) ? 2 : 1;

    return (
      <div
        ref={ref}
        className={cn(timePickerVariants({ orientation }), className)}
        {...props}
      >
        <div className="px-6 pt-6 pb-0">
          <p className="label-medium text-on-surface-variant">Select time</p>
        </div>

        <div className={cn(mainContentVariants({ orientation }))}>
          <div className={cn(
            orientation === 'Horizontal' 
              ? "flex flex-col items-center gap-4" 
              : "flex items-center justify-center"
          )}>
            <div className="flex items-center">
              <div className="flex flex-col items-center w-24">
                <div
                  className={cn(
                    timeInputContainerVariants({
                      state: activeInput === 'hour' ? 'selected' : 'default',
                    })
                  )}
                  onClick={() => setActiveInput('hour')}
                >
                  {formatTime(displayHour)}
                </div>
              </div>
              <div className="display-large text-on-surface-variant mx-1">:</div>
              <div className="flex flex-col items-center w-24">
                <div
                  className={cn(
                    timeInputContainerVariants({
                      state: activeInput === 'minute' ? 'selected' : 'default',
                    })
                  )}
                  onClick={() => setActiveInput('minute')}
                >
                  {formatTime(minute)}
                </div>
              </div>
            </div>
            
            {format === '12h' && (
              <div className={cn(
                amPmContainerVariants({ orientation }),
                orientation === 'Vertical' && 'ml-3'
              )}>
                <button
                  className={cn(amPmButtonVariants({ selected: period === 'AM' }))}
                  onClick={() => handlePeriodChange('AM')}
                >
                  AM
                </button>
                <button
                  className={cn(amPmButtonVariants({ selected: period === 'PM' }))}
                  onClick={() => handlePeriodChange('PM')}
                >
                  PM
                </button>
              </div>
            )}
          </div>

          <div className={cn(clockFaceVariants())}>
            <div
              className={cn(clockHandVariants({ level: handLevel }), 'left-1/2 top-1/2 origin-left transition-transform')}
              style={{ transform: `rotate(${visualRotation - 90}deg)` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary absolute left-full top-1/2 -translate-y-1/2" />
            </div>
            <div className="absolute w-2 h-2 rounded-full bg-primary" />
            {ClockNumbers}
          </div>
        </div>

        <div className="w-full flex justify-between items-center px-6 pb-5 pt-3">
          <IconButton>
            <KeyboardIcon />
          </IconButton>
          <div className="flex gap-2">
            <Button variant="text" onClick={onCancel}>Cancel</Button>
            <Button variant="text" onClick={handleConfirm}>OK</Button>
          </div>
        </div>
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';

export { TimePicker };
