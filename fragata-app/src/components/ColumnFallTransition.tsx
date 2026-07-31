import { useRef, forwardRef, useImperativeHandle } from 'react'

export interface ColumnFallTransitionRef {
  columns: HTMLDivElement[]
  bg: HTMLDivElement | null
  container: HTMLDivElement | null
}

const ColumnFallTransition = forwardRef<ColumnFallTransitionRef, {}>(
  (_props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      get container() {
        return containerRef.current
      },
      get columns() {
        const columns = containerRef.current?.querySelectorAll('.fall-column')
        return Array.from(columns ?? []) as HTMLDivElement[]
      },
      get bg() {
        return containerRef.current?.querySelector('.fall-bg') as HTMLDivElement | null
      }
    }), [])

    return (
      <div
        ref={containerRef}
        className="fixed inset-0 z-[40] pointer-events-none overflow-hidden"
        style={{ opacity: 0 }}
      >
        <div className="fall-bg absolute inset-0 bg-black opacity-0" />
        <div className="fall-columns absolute inset-0 flex">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="fall-column flex-1 min-w-0 h-full bg-black"
            />
          ))}
        </div>
      </div>
    )
  })

export { ColumnFallTransition }