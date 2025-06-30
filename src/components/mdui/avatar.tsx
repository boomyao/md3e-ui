import { tv, type VariantProps } from "tailwind-variants";
import { forwardRef } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

const avatarVariants = tv({
  slots: {
    root: "relative flex shrink-0 overflow-hidden",
    image: "aspect-square h-full w-full",
    fallback: "flex h-full w-full items-center justify-center bg-muted",
  },
  variants: {
    size: {
      small: {
        root: "w-10 h-10 rounded-full",
        fallback: "title-medium",
      },
      medium: {
        root: "w-12 h-12 rounded-full",
        fallback: "title-large",
      },
      large: {
        root: "w-16 h-16 rounded-full",
        fallback: "headline-small",
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export type AvatarProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Root
> &
  VariantProps<typeof avatarVariants>;

const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => {
  const { root } = avatarVariants({ size });
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={root({ class: className })}
      {...props}
    />
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

export type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>;

const AvatarImage = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => {
  const { image } = avatarVariants();
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={image({ class: className })}
      {...props}
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

export type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>;

const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => {
  const { fallback } = avatarVariants();
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={fallback({ class: className })}
      {...props}
    />
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };