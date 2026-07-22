import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

type Props = {
  beforeSrc: string
  afterSrc: string
  alt?: string
}

export function BeforeAfterSlider({ beforeSrc, afterSrc, alt = 'Before and after' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
  }, [])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    updatePosition(e.clientX)
  }

  const stop = () => {
    dragging.current = false
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/11] w-full cursor-ew-resize touch-none select-none overflow-hidden bg-black"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-label="Comparer avant et après"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 3))
        if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 3))
      }}
    >
      {/* After — full base */}
      <img
        src={afterSrc}
        alt={`${alt} — after`}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_18%]"
        draggable={false}
      />

      {/* Before — clipped left side */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={`${alt} — before`}
          className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
          draggable={false}
        />
      </div>

      {/* Divider + white handle (like reference) */}
      <div
        className="absolute inset-y-0 z-10 w-[2px] bg-white"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M8 12H3m0 0 2.5-2.5M3 12l2.5 2.5" />
            <path d="M16 12h5m0 0-2.5-2.5M21 12l-2.5 2.5" />
          </svg>
        </div>
      </div>
    </div>
  )
}
