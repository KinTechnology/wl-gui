import { Loader2Icon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useStore } from '../store'
import { Button } from './ui/button'

function IndividualTab() {
  const { setModal, setLogs } = useStore()
  const [isPending, startTransition] = useTransition()
  const [isRunning, setIsRunning] = useState(false)

  return (
    <div
      className="h-full bg-gray-8 grid grid-cols-2 content-start gap-4 overflow-auto p-4"
    >
      {isRunning ? (
        <Button
          className="relative"
          onClick={() => {
            startTransition(async () => {
              setLogs([`Stopped Packet Engine`])
              await new Promise((resolve) => setTimeout(resolve, 1000))
              setIsRunning(false)
            })
          }}
          disabled={isPending}
        >
          <span className="relative inline-block">
            {isPending ? (
              <Loader2Icon className="right-full top-1/2 -translate-y-1/2 -translate-x-2 absolute animate-spin" />
            ) : null}
            Stop
          </span>
        </Button>
      ) : (
        <Button
          onClick={() => {
            setLogs([`Starting Packet Engine...`])
            startTransition(async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000))
              setLogs([`Started Packet Engine`])
              setIsRunning(true)
            })
          }}
          disabled={isPending}
        >
          <span className="relative inline-block">
            {isPending ? (
              <Loader2Icon className="right-full top-1/2 -translate-y-1/2 -translate-x-2 absolute animate-spin" />
            ) : null}
            Start
          </span>
        </Button>
      )}

      {[
        {
          label: 'Band',
          onClick: () => {
            setModal('band')
          },
        },
        {
          label: 'Channel',
          onClick: () => {
            setModal('channel')
          },
        },
        'TX band width',
        'tx chain',
        'nmode',
        'vhtmode',
        'gmode',
        'Rate',
      ].map((item) =>
        typeof item === 'string' ? (
          <Button key={item} disabled={isRunning || isPending}>
            {item}
          </Button>
        ) : (
          <Button key={item.label} disabled={isRunning || isPending} onClick={item.onClick}>
            {item.label}
          </Button>
        )
      )}
    </div>
  )
}

export { IndividualTab }
