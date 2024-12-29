"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function PlainSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

interface ShimmerEffectProps {
  duration?: number;
  className?: string;
}

const ShimmerEffect: React.FC<ShimmerEffectProps> = ({
  duration = 1.5,
  className = "",
}) => {
  return (
    <div
      style={{
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
      className={cn(className)}
      aria-hidden="true"
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          )`,
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: "linear",
        }}
      />
    </div>
  );
};

interface SkeletonProps {
  animationType?: "plain" | "shimmer";
  className?: string;
  duration?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  animationType = "shimmer",
  className = "",
  duration,
  ...props
}) => {
  return animationType === "shimmer" ? (
    <ShimmerEffect className={className} duration={duration} {...props} />
  ) : (
    <PlainSkeleton className={className} {...props} />
  );
};

export { Skeleton };
