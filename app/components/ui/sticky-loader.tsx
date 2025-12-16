import { Loader2Icon } from 'lucide-react'

function StickyLoader({ pending, children }: { pending?: boolean; children: React.ReactNode }) {
  return (
    <span className="relative z-1">
      {pending && (
        <span className="absolute right-full top-1/2 -translate-y-1/2 pr-2">
          <Loader2Icon className="animate-spin size-[1.1em]" />
        </span>
      )}

      {children}
    </span>
  )
}

export { StickyLoader }
