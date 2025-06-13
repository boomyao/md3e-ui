import React from "react";
import { cn } from "@/lib/utils";

// Card 主组件接口
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "outlined" | "elevated" | "filled";
  children?: React.ReactNode;
}

// Card 主组件
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "outlined", children, ...props }, ref) => {
    const baseClasses = "rounded-xl overflow-hidden motion-default-spatial";
    
    const variantClasses = {
      outlined: "bg-surface border border-outline",
      elevated: "bg-surface-container-low shadow-md",
      filled: "bg-surface-container-highest"
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// CardHeader 组件 - 头部容器
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between p-3 pl-4 pr-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

// CardHeaderContent 组件 - 头部主要内容区域（包含头像和文本）
interface CardHeaderContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardHeaderContent = React.forwardRef<HTMLDivElement, CardHeaderContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeaderContent.displayName = "CardHeaderContent";

// CardHeaderText 组件 - 头部文本区域容器
interface CardHeaderTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardHeaderText = React.forwardRef<HTMLDivElement, CardHeaderTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeaderText.displayName = "CardHeaderText";

// CardMedia 组件 - 媒体内容容器
interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardMedia.displayName = "CardMedia";

// CardContent 组件 - 主内容容器
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-4 space-y-8", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

// CardHeadline 组件 - 内容区域的标题容器
interface CardHeadlineProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardHeadline = React.forwardRef<HTMLDivElement, CardHeadlineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeadline.displayName = "CardHeadline";

// CardActions 组件 - 操作按钮容器
interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex gap-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardActions.displayName = "CardActions";

export {
  Card,
  CardHeader,
  CardHeaderContent,
  CardHeaderText,
  CardMedia,
  CardContent,
  CardHeadline,
  CardActions,
};
