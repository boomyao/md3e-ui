
import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils';
import { NavItem } from './nav-item';

const navigationVariants = tv({
  base: 'flex items-center',
});

/**
 * Represents the definition for a navigation item.
 */
export interface NavigationItemDef {
  id: string;
  icon: React.ReactElement;
  label: string;
  selected?: boolean;
  badgeLabel?: string;
  badgeType?: 'small' | 'large';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface NavigationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof navigationVariants> {
  /**
   * The variant of the navigation bar.
   * 'horizontal' will use HorizontalNavItem.
   * 'vertical' will use VerticalNavItem.
   */
  variant: 'horizontal' | 'vertical';
  /**
   * An array of navigation item definitions.
   */
  items: NavigationItemDef[];
  value?: NavigationItemDef;
  onSelect?: (item: NavigationItemDef) => void;
}

/**
 * A navigation component that can render either horizontal or vertical navigation items.
 */
const Navigation = React.forwardRef<HTMLDivElement, NavigationProps>(
  ({ className, variant, items, value, onSelect, ...props }, ref) => {

    return (
      <div
        ref={ref}
        className={cn(navigationVariants(), className)}
        {...props}
      >
        {items.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            selected={value?.id === item.id}
            badgeType={item.badgeType}
            badgeLabel={item.badgeLabel}
            orientation={variant}
            onClick={() => {
              console.log('clicked');
              onSelect?.(item);
            }}
          />
        ))}
      </div>
    );
  }
);

Navigation.displayName = 'Navigation';

export { Navigation, navigationVariants };
