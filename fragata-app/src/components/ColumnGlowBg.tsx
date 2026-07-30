import { type ReactNode } from 'react'

interface ColumnGlowBgProps {
  children?: ReactNode
  className?: string
  columns?: number
}

export function ColumnGlowBg({ children, className = '', columns = 12 }: ColumnGlowBgProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 480
  const cols = isSmall ? 6 : isMobile ? 8 : columns

  return (
    <div className={`relative h-full w-full overflow-x-hidden bg-[#020617] ${className}`}>
      {/* Columns */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="flex-1 min-w-0 h-full border-r border-blue-900/10"
            style={{
              background: 'linear-gradient(to bottom, #030712 0%, #1d4ed8 50%, #3b82f6 100%)',
              animation: `column-wave 5s infinite ease-in-out`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Central radial glow */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[50vw] max-w-full h-[40vh] blur-[120px] bg-blue-500/25 rounded-full pointer-events-none"
      />

      {/* Content overlay */}
      {children && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}
