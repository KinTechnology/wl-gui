import { createContext, use, useRef, useState } from 'react'

type TStore = {
  modal: string
  setModal: (modal: string) => void
  logs: string[]
  setLogs: (logs: string[]) => void
  action: {
    increment: () => void
  }
}

const StoreContext = createContext<TStore | undefined>(undefined)

const StoreProvider = ({ children }) => {
  const [modal, setModal] = useState<string>('')
  const [logs, setLogs] = useState<string[]>([])
  const ref = useRef(1)

  const increment = () => {
    const current_i = ref.current.toString()
    setLogs((prev) => [...prev, `---[${current_i.padStart(3, '·')}] ${'-'.repeat(28)}`])
    ref.current++
  }

  return (
    <StoreContext.Provider
      value={{
        modal,
        setModal,
        logs,
        setLogs: (next) => setLogs((prev) => [...prev, ...next]),
        action: {
          increment,
        },
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => {
  const store = use(StoreContext)

  if (!store) {
    throw new Error('StoreContext must be used within a StoreProvider')
  }

  return store
}

export { StoreContext, StoreProvider, useStore }
