import { useState } from 'react'
import { Button } from './ui/button'
import { useStore } from '../store'
import { COMMANDS } from '@/lib/data/commands'
import { StickyLoader } from './ui/sticky-loader'
import { usePrompt } from './prompt'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function MainTab() {
  const [runningId, setRunningId] = useState('')
  const { setLogs, action } = useStore()
  const { prompt, alert } = usePrompt()

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-8 w-full p-4 gap-3">
      {Object.entries(COMMANDS).map(([label, createCommands], i) => {
        const invalidInput = (value: string, valueAsNumber: number) => {
          alert({
            title: 'Invalid Input',
            message: (
              <>
                <p>Please enter a valid number.</p>
                <p>
                  {value} ({valueAsNumber}) is not a valid number
                </p>
              </>
            ),
          })
        }

        const onConfirm = async (value: string) => {
          const valueAsNumber = parseFloat(value)

          if (isNaN(valueAsNumber)) {
            invalidInput(value, valueAsNumber)
            return
          }

          try {
            setRunningId(label)
            action.increment()
            const [command, ...restCommands] = createCommands(valueAsNumber)

            setLogs([`running ${command}`])
            await window.execAsync('wl', [command]).catch(() => {})

            for (const command of restCommands) {
              if (command.startsWith('up') || command.startsWith('down')) {
                await sleep(3000)
              }
              if (command.startsWith('nrate')) {
                await sleep(2000)
              }

              setLogs([`running ${command}`])
              await new Promise((resolve) => setTimeout(resolve, 1000))
              await window.execAsync('wl', [command]).catch((err) => {
                setLogs([`Error: ${err.message}`, `Error: exit code: ${err.code ?? 'unknown'}`, ''])
              })
            }
          } catch (err: any) {
            setLogs([`Error: ${err.message}`, `Error: exit code: ${err.code ?? 'unknown'}`, ''])
          } finally {
            setRunningId('')
          }
        }

        return (
          <Button
            key={i}
            disabled={!!runningId}
            onClick={async () => {
              prompt({
                title: 'Run Command',
                message: (
                  <>
                    <p>{label}</p>
                    <p className="pt-7">Enter the value for Tx Power:</p>
                  </>
                ),
                onConfirm: onConfirm,
              })
            }}
          >
            <StickyLoader pending={runningId === label}>{label}</StickyLoader>
          </Button>
        )
      })}
    </div>
  )
}

export { MainTab }
