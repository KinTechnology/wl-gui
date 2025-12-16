import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import { BandModal } from './components/band-modal'
import { ChannelModal } from './components/channel-modal'
import { IndividualTab } from './components/individual-tab'
import { MainTab } from './components/main-tab'
import { OutputWindow } from './components/output-window'
import { ResizeBar } from './components/resize-bar'

function TabButton({
  isActive,
  className,
  children,
  ...props
}: {
  isActive?: boolean
} & React.ComponentProps<'button'>) {
  return (
    <button className={cn('px-4', isActive ? 'bg-gray-8' : 'bg-gray-7', className)} {...props}>
      {children}
    </button>
  )
}

const TABS = [
  {
    label: 'Main',
    value: 'main',
  },
  {
    label: 'Individual Cmds',
    value: 'individual_cmds',
  },
] as const

export default function App() {
  const ref = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState<(typeof TABS)[number]['value']>('main')

  return (
    <div className="h-full flex flex-col">
      <header className="">
        {TABS.map(({ label, value }) => (
          <TabButton
            key={value}
            isActive={tab === value}
            onClick={() => {
              setTab(value)
            }}
          >
            {label}
          </TabButton>
        ))}
      </header>

      <div className="flex-1 flex grow shrink-0">
        <div ref={ref} className="w-1/2 flex-1 relative min-w-[20vw] flex flex-col">
          {tab === 'main' ? <MainTab /> : tab === 'individual_cmds' ? <IndividualTab /> : null}
          <ResizeBar targetRef={ref} />
        </div>

        <OutputWindow />
      </div>

      <ChannelModal />
      <BandModal />
    </div>
  )
}
