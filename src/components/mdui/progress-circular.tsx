import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string => {
  if (startAngle === endAngle) {
    return "";
  }
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

const generateWavyPoints = (
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  amplitude: number,
  frequency: number,
  time: number,
) => {
  const points = [];
  const angleStep = 4;
  for (
    let angle = startAngle;
    angle <= endAngle;
    angle += angleStep > endAngle - startAngle ? endAngle - startAngle : angleStep
  ) {
    const angleRad = (angle * Math.PI) / 180;
    const r_offset = amplitude * Math.sin(frequency * angleRad + time);
    const currentRadius = radius + r_offset;
    points.push(polarToCartesian(cx, cy, currentRadius, angle));
    if (angle >= endAngle) break;
  }
  return points;
};

const createSmoothPath = (points: { x: number; y: number }[]) => {
  if (points.length < 2) {
    return points.length === 1 ? `M ${points[0].x} ${points[0].y}` : "";
  }
  let path = `M ${points[0].x} ${points[0].y}`;
  const p = [points[0], ...points, points[points.length - 1]];
  for (let i = 1; i < p.length - 2; i++) {
    const t = 1 / 6;
    const c1 = {
      x: p[i].x + t * (p[i + 1].x - p[i - 1].x),
      y: p[i].y + t * (p[i + 1].y - p[i - 1].y),
    };
    const c2 = {
      x: p[i + 1].x - t * (p[i + 2].x - p[i].x),
      y: p[i + 1].y - t * (p[i + 2].y - p[i].y),
    };
    path += ` C ${c1.x},${c1.y} ${c2.x},${c2.y} ${p[i + 1].x},${p[i + 1].y}`;
  }
  return path;
};

const useWavyProgress = ({
  progressValue,
  size,
  thickness,
}: {
  progressValue: number;
  size: number;
  thickness: number;
}) => {
  const [wavyPath, setWavyPath] = React.useState("");
  const center = size / 2;
  const radius = size / 2 - thickness;
  const endAngle = (progressValue / 100) * 360;

  React.useEffect(() => {
    if (progressValue === 100) {
      setWavyPath("");
      return;
    }

    let frameId: number;
    const animate = (time: number) => {
      if (progressValue > 0) {
        const wavyPoints = generateWavyPoints(
          center,
          center,
          radius - thickness / 2,
          0,
          endAngle,
          thickness / 4,
          4 + radius / 4,
          time * 0.005,
        );
        setWavyPath(createSmoothPath(wavyPoints));
      } else {
        setWavyPath("");
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [progressValue, size, thickness, center, radius, endAngle]);

  return wavyPath;
}; 

const progressVariants = cva("relative inline-flex shrink-0");

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  size?: number;
  thickness?: number;
}

const CircularProgress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, size = 40, thickness = 4, ...props }, ref) => {
    const center = size / 2;
    const radius = size / 2 - thickness;
    const progressValue = Math.min(Math.max(value, 0), 100);

    const wavyPath = useWavyProgress({ progressValue, size, thickness });

    const trackPath = React.useMemo(() => {
      if (progressValue >= 100) {
        return "";
      }
      const endAngle = (progressValue / 100) * 360;
      const trackGapAngle = 15;
      const trackStartAngle = endAngle + trackGapAngle;
      const trackEndAngle = 360 - trackGapAngle;
      if (trackStartAngle >= 360) {
        return "";
      }
      return describeArc(center, center, radius, trackStartAngle, trackEndAngle);
    }, [progressValue, center, radius]);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(progressVariants({ className }))}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {progressValue === 100 ? (
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              strokeWidth={thickness}
              className="stroke-primary"
            />
          ) : (
            <>
              {progressValue < 100 && (
                <path
                  d={trackPath}
                  fill="none"
                  strokeWidth={thickness}
                  className="stroke-secondary-container"
                  strokeLinecap="round"
                />
              )}
              <path
                d={wavyPath}
                fill="none"
                strokeWidth={thickness}
                className="stroke-primary"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </div>
    );
  },
);

export { CircularProgress };
