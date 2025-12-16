import { useState } from 'react'
import { Button } from './ui/button'
import { useStore } from '../store'
import { COMMANDS } from '@/lib/data/commands'
import { StickyLoader } from './ui/sticky-loader'

function MainTab() {
  const [runningId, setRunningId] = useState('')
  const { setLogs, action } = useStore()

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-8 w-full p-4 gap-3">
      {Object.entries(COMMANDS).map(([label, createCommands], i) => (
        <Button
          key={i}
          disabled={!!runningId}
          onClick={async () => {
            try {
              setRunningId(label)
              action.increment()
              const commands = createCommands(15)

              for (const command of commands) {
                setLogs([`running ${command}`])
                await new Promise((resolve) => setTimeout(resolve, 1000))
                await window.execAsync('wl', [command])
              }
            } catch (err: any) {
              setLogs([`Error: ${err.message}`, `Error: exit code: ${err.code ?? 'unknown'}`, ''])
            } finally {
              setRunningId('')
            }
          }}
        >
          <StickyLoader pending={runningId === label}>{label}</StickyLoader>
        </Button>
      ))}
    </div>
  )
}

export { MainTab }
