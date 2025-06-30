
import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

const navItemVariants = tv({
  slots: {
    wrapper: 'group/nav-item relative flex cursor-pointer justify-center items-center focus:outline-none',
    content: 'relative flex items-center justify-center',
    stateOverlay: 'absolute inset-0 transition-colors',
    icon: 'transition-colors',
    label: 'label-medium transition-colors',
  },
  variants: {
    orientation: {
      horizontal: {
        wrapper: 'h-16 w-auto',
        content: 'flex-row gap-1 rounded-[20px] py-2 px-4',
        stateOverlay:
          'rounded-[20px] bg-on-secondary-container/0 group-hover/nav-item:bg-on-secondary-container/8 group-focus-visible/nav-item:bg-on-secondary-container/10 group-active/nav-item:bg-on-secondary-container/10',
      },
      vertical: {
        wrapper: 'w-full flex-col gap-1 py-1.5 px-0',
        content: 'h-8 w-14 rounded-2xl',
        stateOverlay: 'rounded-2xl',
      },
    },
    selected: {
      true: {
        content: 'bg-secondary-container',
        icon: 'text-on-secondary-container',
        label: 'text-on-secondary-container',
      },
      false: {
        content: 'bg-transparent',
        icon: 'text-on-surface-variant',
        label: 'text-on-surface-variant',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'vertical',
      selected: true,
      class: {
        stateOverlay:
          'bg-on-secondary-container/0 group-hover/nav-item:bg-on-secondary-container/8 group-focus-visible/nav-item:bg-on-secondary-container/10 group-active/nav-item:bg-on-secondary-container/10',
      },
    },
    {
      orientation: 'vertical',
      selected: false,
      class: {
        stateOverlay:
          'bg-on-surface/0 group-hover/nav-item:bg-on-surface/8 group-focus-visible/nav-item:bg-on-surface/10 group-active/nav-item:bg-on-surface/10',
      },
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    selected: false,
  },
});

export interface NavItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navItemVariants> {
  badgeType?: 'large' | 'small';
  badgeLabel?: string;
  icon: React.ReactElement;
  label: string;
}

const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ className, orientation, selected, badgeType, badgeLabel, icon, label, ...props }, ref) => {
    const {
      wrapper,
      content,
      stateOverlay,
      icon: iconSlot,
      label: labelSlot,
    } = navItemVariants({
      orientation,
      selected,
    });

    const badge = badgeType && (
      <Badge
        className={cn(
          'absolute',
          orientation === 'horizontal' && badgeType === 'large' && 'top-1.5 left-7',
          orientation === 'horizontal' && badgeType === 'small' && 'top-2 left-[34px]',
          orientation === 'vertical' && badgeType === 'large' && 'top-0.5 left-7 bg-error',
          orientation === 'vertical' && badgeType === 'small' && 'top-1 left-[34px] bg-error'
        )}
      >
        {badgeLabel}
      </Badge>
    );

    if (orientation === 'horizontal') {
      return (
        <a ref={ref} className={cn(wrapper(), className)} {...props}>
          <div className={content()}>
            <div className={stateOverlay()} />
            {React.cloneElement(icon, { className: cn(iconSlot()) })}
            <span className={labelSlot()}>{label}</span>
            {badge}
          </div>
        </a>
      );
    }

    return (
      <a ref={ref} className={cn(wrapper(), className)} {...props}>
        <div className={content()}>
          <div className={stateOverlay()} />
          {React.cloneElement(icon, { className: cn(iconSlot()) })}
          {badge}
        </div>
        <span className={labelSlot()}>{label}</span>
      </a>
    );
  }
);

NavItem.displayName = 'NavItem';

export { NavItem, navItemVariants };
