import * as React from 'react';
import { type VariantProps, tv } from 'tailwind-variants';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { IconButton } from './icon-button';
import { MoreVertIcon } from '@/components/mdui/icons';

const stackCardVariants = tv({
  slots: {
    base: 'relative flex flex-col w-[360px] h-[480px] rounded-large overflow-hidden',
    background: 'absolute inset-0 rounded-inherit',
    header: 'flex items-center justify-between h-[72px] py-3 pl-4 pr-1',
    headerLeft: 'flex items-center gap-4',
    avatar:
      'flex items-center justify-center w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container title-medium',
    headerTextGroup: 'flex flex-col',
    headerText: 'title-medium text-on-surface',
    subheadText: 'body-medium text-on-surface-variant',
    media: 'h-[188px] bg-surface-variant',
    mediaImage: 'w-full h-full object-cover',
    textContent: 'flex flex-1 flex-col justify-between p-4',
    textContainer: 'flex flex-col gap-4',
    headlineGroup: 'flex flex-col',
    titleText: 'body-large text-on-surface',
    subtitleText: 'body-medium text-on-surface-variant',
    supportingText: 'body-medium text-on-surface-variant',
    actions: 'flex items-center justify-end gap-2 h-10',
  },
  variants: {
    variant: {
      Outlined: {
        base: 'border border-outline-variant',
        background: 'bg-surface',
      },
      Elevated: {
        base: 'shadow-elevation-1',
        background: 'bg-surface-container-low',
      },
      Filled: {
        background: 'bg-surface-container-highest',
      },
    },
  },
  defaultVariants: {
    variant: 'Outlined',
  },
});

export interface StackedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackCardVariants> {
  avatarInitial?: string;
  headerText?: string;
  subheadText?: string;
  mediaImage?: string;
  titleText?: string;
  subtitleText?: string;
  supportingText?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  showSecondaryAction?: boolean;
  onMoreIconClick?: () => void;
  onPrimaryActionClick?: () => void;
  onSecondaryActionClick?: () => void;
}

const StackedCard = React.forwardRef<HTMLDivElement, StackedCardProps>(
  (
    {
      className,
      avatarInitial,
      headerText,
      subheadText,
      mediaImage,
      titleText,
      subtitleText,
      supportingText,
      primaryActionLabel,
      secondaryActionLabel,
      showSecondaryAction,
      variant,
      onMoreIconClick,
      onPrimaryActionClick,
      onSecondaryActionClick,
      ...props
    },
    ref
  ) => {
    const {
      base,
      background,
      header,
      headerLeft,
      avatar,
      headerTextGroup,
      media,
      mediaImage: mediaImageStyle,
      textContent,
      textContainer,
      headlineGroup,
      titleText: titleTextStyle,
      subtitleText: subtitleTextStyle,
      supportingText: supportingTextStyle,
      actions,
    } = stackCardVariants({ variant: variant });

    return (
      <div ref={ref} className={cn(base(), className)} {...props}>
        <div className={cn(background())} />
        <div className="relative flex flex-1 flex-col">
          <div className={cn(header())}>
            <div className={cn(headerLeft())}>
              {avatarInitial && <div className={cn(avatar())}>{avatarInitial}</div>}
              <div className={cn(headerTextGroup())}>
                {headerText && <div className={cn(headerText)}>{headerText}</div>}
                {subheadText && (
                  <div className={cn(subheadText)}>{subheadText}</div>
                )}
              </div>
            </div>
            <IconButton onClick={onMoreIconClick}>
              <MoreVertIcon />
            </IconButton>
          </div>

          {mediaImage && (
            <div className={cn(media())}>
              <img
                src={mediaImage}
                alt={titleText || 'Card media'}
                className={cn(mediaImageStyle())}
              />
            </div>
          )}

          <div className={cn(textContent())}>
            <div className={cn(textContainer())}>
              {(titleText || subtitleText) && (
                <div className={cn(headlineGroup())}>
                  {titleText && (
                    <div className={cn(titleTextStyle())}>{titleText}</div>
                  )}
                  {subtitleText && (
                    <div className={cn(subtitleTextStyle())}>{subtitleText}</div>
                  )}
                </div>
              )}
              {supportingText && (
                <div className={cn(supportingTextStyle())}>{supportingText}</div>
              )}
            </div>

            {(primaryActionLabel || showSecondaryAction) && (
              <div className={cn(actions())}>
                {showSecondaryAction && secondaryActionLabel && (
                  <Button variant="outlined" onClick={onSecondaryActionClick}>
                    {secondaryActionLabel}
                  </Button>
                )}
                {primaryActionLabel && (
                  <Button variant="filled" onClick={onPrimaryActionClick}>
                    {primaryActionLabel}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

StackedCard.displayName = 'StackedCard';

export { StackedCard, stackCardVariants };
