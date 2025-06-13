import React from "react";
import {
  Card,
  CardHeader,
  CardHeaderContent,
  CardHeaderText,
  CardMedia,
  CardContent,
  CardHeadline,
  CardActions,
} from "../mdui/card";
import { MoreHorizontal, Heart, Share, BookmarkPlus } from "lucide-react";

// Simulated standalone components from component library
const Avatar = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-10 h-10 rounded-full bg-primary-container flex items-center justify-center title-medium text-on-primary-container ${className}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  variant = "outlined", 
  className = "", 
  ...props 
}: { 
  children: React.ReactNode; 
  variant?: "filled" | "outlined"; 
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseClasses = "h-10 px-4 rounded-full label-large motion-fast-effects";
  const variantClasses = {
    filled: "bg-primary text-on-primary hover:shadow-md",
    outlined: "border border-outline text-on-surface-variant hover:bg-on-surface/8"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const IconButton = ({ 
  children, 
  className = "", 
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    className={`w-12 h-12 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-on-surface/8 motion-fast-effects ${className}`}
    {...props}
  >
    {children}
  </button>
);

export function CardDemo() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="headline-large text-on-background">Card Component Demo</h1>
      
      {/* Outlined Card */}
      <div className="space-y-4">
        <h2 className="title-large text-on-background">Outlined Card</h2>
        <Card variant="outlined" className="max-w-sm">
          <CardHeader>
            <CardHeaderContent>
              <Avatar>M</Avatar>
              <CardHeaderText>
                <h3 className="title-medium text-on-surface">Material Design</h3>
                <p className="body-medium text-on-surface">Design System</p>
              </CardHeaderText>
            </CardHeaderContent>
            <IconButton>
              <MoreHorizontal className="w-6 h-6" />
            </IconButton>
          </CardHeader>
          
          <CardMedia className="h-48 bg-surface-variant" />
          
          <CardContent>
            <CardHeadline>
              <h2 className="body-large text-on-surface">Beautiful Material 3</h2>
              <p className="body-medium text-on-surface-variant">Modern Design Language</p>
            </CardHeadline>
            
            <p className="body-medium text-on-surface-variant">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            
            <CardActions>
              <Button variant="outlined">Learn More</Button>
              <Button variant="filled">Get Started</Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>

      {/* Elevated Card */}
      <div className="space-y-4">
        <h2 className="title-large text-on-background">Elevated Card</h2>
        <Card variant="elevated" className="max-w-sm">
          <CardHeader>
            <CardHeaderContent>
              <Avatar>R</Avatar>
              <CardHeaderText>
                <h3 className="title-medium text-on-surface">React Components</h3>
                <p className="body-medium text-on-surface">TypeScript Library</p>
              </CardHeaderText>
            </CardHeaderContent>
            <IconButton>
              <BookmarkPlus className="w-6 h-6" />
            </IconButton>
          </CardHeader>
          
          <CardMedia className="h-48 bg-primary-container" />
          
          <CardContent>
            <CardHeadline>
              <h2 className="body-large text-on-surface">Component Library</h2>
              <p className="body-medium text-on-surface-variant">High-quality React components</p>
            </CardHeadline>
            
            <p className="body-medium text-on-surface-variant">
              React component library built based on Material Design 3 specifications, providing complete design system support.
            </p>
            
            <CardActions>
              <Button variant="outlined">Documentation</Button>
              <Button variant="filled">Download</Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>

      {/* Filled Card */}
      <div className="space-y-4">
        <h2 className="title-large text-on-background">Filled Card</h2>
        <Card variant="filled" className="max-w-sm">
          <CardHeader>
            <CardHeaderContent>
              <Avatar>T</Avatar>
              <CardHeaderText>
                <h3 className="title-medium text-on-surface">Tailwind CSS</h3>
                <p className="body-medium text-on-surface">Utility-first CSS framework</p>
              </CardHeaderText>
            </CardHeaderContent>
            <IconButton>
              <Share className="w-6 h-6" />
            </IconButton>
          </CardHeader>
          
          <CardMedia className="h-48 bg-secondary-container" />
          
          <CardContent>
            <CardHeadline>
              <h2 className="body-large text-on-surface">Rapid Style Development</h2>
              <p className="body-medium text-on-surface-variant">Modern CSS Tools</p>
            </CardHeadline>
            
            <p className="body-medium text-on-surface-variant">
              Use utility-first CSS classes to quickly build modern user interfaces without leaving your HTML.
            </p>
            
            <CardActions>
              <Button variant="outlined">Try It</Button>
              <Button variant="filled">Get Started</Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>

      {/* Simplified Card */}
      <div className="space-y-4">
        <h2 className="title-large text-on-background">Simplified Card</h2>
        <Card variant="outlined" className="max-w-sm">
          <CardContent>
            <CardHeadline>
              <h2 className="body-large text-on-surface">Simple Card</h2>
              <p className="body-medium text-on-surface-variant">Most basic card layout</p>
            </CardHeadline>
            
            <p className="body-medium text-on-surface-variant">
              This is a simplified card example containing only the basic content area.
            </p>
            
            <CardActions>
              <Button variant="filled">Action</Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>

      {/* Custom Media Card */}
      <div className="space-y-4">
        <h2 className="title-large text-on-background">Custom Media Content</h2>
        <Card variant="elevated" className="max-w-sm">
          <CardMedia>
            <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Heart className="w-16 h-16 text-on-primary" />
            </div>
          </CardMedia>
          
          <CardContent>
            <CardHeadline>
              <h2 className="body-large text-on-surface">Custom Content</h2>
              <p className="body-medium text-on-surface-variant">Flexible media area</p>
            </CardHeadline>
            
            <p className="body-medium text-on-surface-variant">
              The media area can hold any custom content such as icons, images, videos, etc.
            </p>
            
            <CardActions>
              <Button variant="outlined">Like</Button>
              <Button variant="filled">Bookmark</Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>

      {/* Media Only Card */}
      <div className="space-y-4">
        <h2 className="title-large text-on-background">Media Only Card</h2>
        <Card variant="outlined" className="max-w-sm">
          <CardMedia>
            <img 
              src="https://picsum.photos/400/200" 
              alt="Example image" 
              className="w-full h-48 object-cover"
            />
          </CardMedia>
        </Card>
      </div>
    </div>
  );
}

export default CardDemo; 