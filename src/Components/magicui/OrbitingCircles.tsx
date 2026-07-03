import React from 'react'

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(' ')
}

export interface OrbitingCirclesProps {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 160,
  path = true,
  iconSize = 40,
  speed = 1,
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <circle
            className="stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index
        return (
          <div
            style={
              {
                '--duration': calculatedDuration,
                '--radius': radius,
                '--angle': angle,
                '--icon-size': `${iconSize}px`,
                animationDelay: `${delay}s`,
              } as React.CSSProperties
            }
            className={cn(
              'absolute left-1/2 top-1/2 flex size-[var(--icon-size)] -translate-x-1/2 -translate-y-1/2 transform-gpu animate-orbit items-center justify-center rounded-full',
              reverse && '[animation-direction:reverse]',
              className,
            )}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}

export default OrbitingCircles
