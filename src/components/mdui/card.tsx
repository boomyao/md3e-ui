import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const cardVariants = tv({
  slots: {
    base: 'relative flex rounded-xl overflow-hidden',
    header: 'flex items-center',
    headerContent: 'flex items-center gap-4 flex-1',
    headerText: 'flex flex-col',
    media: 'bg-surface-variant',
    content: 'flex flex-col',
    actions: 'flex items-center gap-2',
  },
  variants: {
    variant: {
      Outlined: {
        base: 'border border-outline-variant bg-surface',
      },
      Elevated: {
        base: 'bg-surface-container-low shadow-elevation-1',
      },
      Filled: {
        base: 'bg-surface-container-highest',
      },
    },
    layout: {
      vertical: {
        base: 'flex-col w-[360px]',
        header: 'h-[72px] py-3 pl-4 pr-1',
        media: 'h-[188px]',
        content: 'flex-grow p-4 gap-4',
        actions: 'justify-end pt-2',
      },
      horizontal: {
        base: 'flex-row w-[360px] h-[128px]',
        header: 'p-4',
        media: 'w-[128px] h-full',
        content: 'flex-grow p-4 gap-4',
        actions: 'justify-end',
      },
    },
  },
  defaultVariants: {
    variant: 'Outlined',
    layout: 'vertical',
  },
});

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

const CardContext = React.createContext<{
  slots: ReturnType<typeof cardVariants>;
}>({
  slots: cardVariants(),
});

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, layout, ...props }, ref) => {
    const slots = cardVariants({ variant, layout });
    return (
      <CardContext.Provider value={{ slots }}>
        <div ref={ref} className={cn(slots.base(), className)} {...props} />
      </CardContext.Provider>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { slots } = React.useContext(CardContext);
  return (
    <div ref={ref} className={cn(slots.header(), className)} {...props} />
  );
});
CardHeader.displayName = 'CardHeader';

const CardHeaderContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { slots } = React.useContext(CardContext);
  return (
    <div
      ref={ref}
      className={cn(slots.headerContent(), className)}
      {...props}
    />
  );
});
CardHeaderContent.displayName = 'CardHeaderContent';

const CardHeaderText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { slots } = React.useContext(CardContext);
  return (
    <div ref={ref} className={cn(slots.headerText(), className)} {...props} />
  );
});
CardHeaderText.displayName = 'CardHeaderText';

const CardMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { slots } = React.useContext(CardContext);
  return <div ref={ref} className={cn(slots.media(), className)} {...props} />;
});
CardMedia.displayName = 'CardMedia';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { slots } = React.useContext(CardContext);
  return (
    <div ref={ref} className={cn(slots.content(), className)} {...props} />
  );
});
CardContent.displayName = 'CardContent';

const CardActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { slots } = React.useContext(CardContext);
  return (
    <div ref={ref} className={cn(slots.actions(), className)} {...props} />
  );
});
CardActions.displayName = 'CardActions';

export {
  Card,
  CardHeader,
  CardHeaderContent,
  CardHeaderText,
  CardMedia,
  CardContent,
  CardActions,
  cardVariants,
};