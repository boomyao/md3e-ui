import React, { useRef, useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const WAVE_LENGTH = 40;
const AMPLITUDE = 3;
const STOP_RADIUS = 2;
const GAP = 4;
const HORIZONTAL_PADDING = 4;

function getLinePath(start: number, end: number, centerY: number) {
  return `M ${start} ${centerY} L ${end} ${centerY}`;
}

function getWavePath(len: number, phase: number, centerY: number, variant: "flat" | "wavy") {
  if (variant === "flat") {
    return getLinePath(0, len, centerY);
  }
  let d = `M 0 ${centerY + AMPLITUDE * Math.sin(phase)} `;
  for (let x = 0; x <= len; x += 1) {
    const y = centerY + AMPLITUDE * Math.sin((2 * Math.PI * x) / WAVE_LENGTH + phase);
    d += `L ${x} ${y} `;
  }
  return d;
}

function useWavyPhase(enabled: boolean) {
  const [phase, setPhase] = useState(0);
  const reqRef = useRef<number>(0);

  useEffect(() => {
    if (enabled) {
      const animate = () => {
        setPhase((p: number) => p + 0.08);
        reqRef.current = requestAnimationFrame(animate);
      };
      reqRef.current = requestAnimationFrame(animate);
      return () => {
        if (reqRef.current) cancelAnimationFrame(reqRef.current);
      };
    } else {
      setPhase(0);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    }
  }, [enabled]);

  return phase;
}

export interface ProgressLinearProps {
  value: number;
  thickness?: number;
  width?: number;
  className?: string;
  variant?: "flat" | "wavy";
}

export const LinearProgress: React.FC<ProgressLinearProps> = ({
  value,
  thickness = 4,
  width,
  className,
  variant = "flat",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (width) {
      setContainerWidth(width);
    } else {
      setContainerWidth(containerRef.current?.clientWidth ?? 0);
    }
  }, [width]);

  const phase = useWavyPhase(variant === "wavy");

  const percent = Math.max(0, Math.min(100, value));
  const progressX = (containerWidth * percent) / 100;
  const centerY = thickness / 2 + AMPLITUDE;

  const containerStyle = useMemo(() => ({
    width: containerWidth ? `${containerWidth}px` : '100%',
    padding: `0 ${HORIZONTAL_PADDING}px`,
  }), [containerWidth]);

  const svgSize = useMemo(() => ({
    width: containerWidth,
    height: thickness + AMPLITUDE * 2,
  }), [containerWidth, thickness]);

  if (!containerWidth) return <div ref={containerRef} className="w-full" style={containerStyle}></div>;

  return (
    <div
      className={cn(
        "relative overflow-visible block box-content",
        className
      )}
      style={containerStyle}
      data-value={value}
    >
      <svg
        width={svgSize.width}
        height={svgSize.height}
        viewBox={`-${thickness / 2} 0 ${svgSize.width + thickness} ${svgSize.height}`}
      >
        <path
          d={getLinePath(progressX + GAP + thickness, svgSize.width, centerY)}
          className="stroke-secondary-container fill-none"
          strokeWidth={thickness}
          strokeLinecap="round"
        />
        <path
          d={getWavePath(progressX, phase, centerY, value === 100 ? "flat" : variant)}
          className="stroke-primary fill-none"
          strokeWidth={thickness}
          strokeLinecap="round"
        />
        <circle
          cx={svgSize.width}
          cy={centerY}
          r={STOP_RADIUS}
          className="fill-primary"
        />
      </svg>
    </div>
  );
};

