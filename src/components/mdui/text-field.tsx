import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textFieldVariants = cva(
  'inline-flex flex-col group/textfield',
  {
    variants: {
      variant: {
        filled: '',
        outlined: '',
      },
      disabled: {
        true: 'opacity-disabled cursor-not-allowed',
        false: '',
      },
      error: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'filled',
      disabled: false,
      error: false,
    },
  }
);

const containerVariants = cva(
  [
    'relative flex h-[56px] items-center rounded-t-extra-small',
    'transition-colors duration-expressive-standard ease-expressive-standard',
  ],
  {
    variants: {
      variant: {
        filled: [
          'bg-surface-container-highest',
          "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:origin-center after:scale-x-0 after:bg-primary after:transition-transform after:duration-expressive-standard after:ease-expressive-standard",
          'group-has-[textarea:focus]/textfield:after:scale-x-100 group-has-[textarea:focus]/textfield:after:h-[3px]',
          'border-b border-solid border-on-surface-variant',
          'group-hover/textfield:border-on-surface',
        ],
        outlined: [
          'bg-transparent rounded-extra-small',
          'outline outline-1 outline-outline group-hover/textfield:outline-on-surface',
          'group-has-[textarea:focus]/textfield:outline-[3px] group-has-[textarea:focus]/textfield:outline-primary',
        ],
      },
      error: {
        true: '',
      },
    },
    compoundVariants: [
      {
        variant: 'filled',
        error: true,
        className: 'border-error group-has-[textarea:focus]/textfield:after:bg-error',
      },
      {
        variant: 'outlined',
        error: true,
        className: 'outline-error group-has-[textarea:focus]/textfield:outline-error',
      },
    ],
  }
);

const inputVariants = cva(
  [
    'peer z-[1] h-full w-full resize-none self-start bg-transparent px-4 pt-6 pb-2 text-on-surface outline-none body-large',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      leading: {
        true: 'pl-12',
      },
      trailing: {
        true: 'pr-12',
      },
    },
  }
);

const labelVariants = cva(
  [
    'pointer-events-none absolute z-[2] text-on-surface-variant',
    'transition-all duration-expressive-standard ease-expressive-standard',
    'peer-focus:text-primary',
    // Un-floated state
    'body-large top-1/2 -translate-y-1/2',
    // Floated state
    'peer-focus:body-small peer-[:not(:placeholder-shown)]:body-small',
  ],
  {
    variants: {
      variant: {
        filled: [
          'peer-focus:top-1 peer-focus:-translate-y-0',
          'peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:-translate-y-0',
        ],
        outlined: [
          'peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-surface peer-focus:px-1',
          'peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:bg-surface peer-[:not(:placeholder-shown)]:px-1',
        ],
      },
      leading: {
        true: 'left-12 peer-[:not(:placeholder-shown)]:left-4',
        false: 'left-4',
      },
      error: {
        true: 'text-error peer-focus:text-error',
      },
    },
  }
);

const leadingIconVariants = cva('absolute left-0 w-12 h-12 flex items-center justify-center top-1/2 -translate-y-1/2 z-[1]');
const trailingIconVariants = cva('absolute right-0 w-12 h-12 flex items-center justify-center top-1/2 -translate-y-1/2 z-[1]');

const supportingTextVariants = cva(
  'px-4 pt-1 text-on-surface-variant body-small',
  {
    variants: {
      error: {
        true: 'text-error',
      },
    },
  }
);

export interface TextFieldProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'disabled' | 'color'>,
    VariantProps<typeof textFieldVariants> {
  label?: string;
  supportingText?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const TextField = React.forwardRef<HTMLTextAreaElement, TextFieldProps>(
  (
    {
      className,
      variant,
      disabled = false,
      error = false,
      label,
      supportingText,
      leading,
      trailing,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    return (
      <div className={cn(textFieldVariants({ variant, disabled, error, className }))}>
        <div className={cn(containerVariants({ variant, error }))}>
          {leading && <div className={cn(leadingIconVariants())}>{leading}</div>}
          <textarea
            id={id}
            ref={ref}
            className={cn(inputVariants({ leading: !!leading, trailing: !!trailing }))}
            rows={1}
            disabled={!!disabled}
            {...props}
            placeholder=" "
          />
          {label && (
            <label
              htmlFor={id}
              className={cn(labelVariants({ variant, leading: !!leading, error }))}
            >
              {label}
            </label>
          )}
          {trailing && <div className={cn(trailingIconVariants())}>{trailing}</div>}
        </div>
        {supportingText && (
          <p className={cn(supportingTextVariants({ error }))}>
            {supportingText}
          </p>
        )}
      </div>
    );
  }
);
TextField.displayName = 'TextField';

export { TextField };
