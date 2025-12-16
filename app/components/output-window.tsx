import { cn } from '@/lib/utils'
import { useStore } from '../store'

function OutputWindow() {
  const { logs } = useStore()

  return (
    <div
      ref={(el) => {
        if (!el) return

        el.scrollTo({
          top: el.scrollHeight,
          behavior: 'smooth',
        })
      }}
      className="flex-1 min-w-[20vw] bg-gray-9 text-white p-4 overflow-auto"
    >
      <h2>Output Window</h2>

      <ul>
        {logs.map((item, i) => (
          <li key={item + i} className={cn('text-sm font-mono', item.startsWith('Error: ') && 'text-red')}>
            {item === '' ? (
              <>&nbsp;</>
            ) : item.startsWith('---[') ? (
              <>---[{item.substring('---['.length)}</>
            ) : (
              <>-&gt; {item}</>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { OutputWindow }
