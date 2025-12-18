import { nextTick } from '@/lib/utils'
import { createContext, useContext, useState } from 'react'
import { Presence } from './presence'
import { AlertDialog, AlertProps } from './prompt/alert'
import { InputProps, PromptDialog } from './prompt/prompt'

export type BaseInputProps = {
  type: 'confirm' | 'alert'
  title: string
  message?: React.ReactNode
  onConfirm?: (input: string) => void
  onCancel?: () => void
}

type TPromptCtx = {
  prompt: (opts: InputProps) => void
  alert: (opts: AlertProps) => void
}

const PromptCtx = createContext<TPromptCtx | undefined>(undefined)

const PromptProvider = ({ children }: { children: React.ReactNode }) => {
  const [input, setInput] = useState<BaseInputProps | undefined>(undefined)

  const prompt = (opts: Omit<BaseInputProps, 'type'>) => {
    setInput({
      ...opts,
      onConfirm: (input) => nextTick(() => opts.onConfirm?.(input)),
      onCancel: () => nextTick(() => opts.onCancel?.()),
      type: 'confirm',
    })
  }

  const alert = (opts: AlertProps) => {
    setInput({
      ...opts,
      onConfirm: undefined,
      onCancel: () => nextTick(() => opts.onCancel?.()),
      type: 'alert',
    })
  }

  const onClose = () => {
    setInput(undefined)
  }

  return (
    <PromptCtx.Provider value={{ prompt, alert }}>
      {children}

      <Presence present={input != undefined}>
        {input?.type === 'confirm' ? (
          <PromptDialog input={input} onClose={onClose} />
        ) : input?.type === 'alert' ? (
          <AlertDialog input={input} onClose={onClose} />
        ) : (
          <div />
        )}
      </Presence>
    </PromptCtx.Provider>
  )
}

const usePrompt = () => {
  const ctx = useContext(PromptCtx)
  if (ctx === undefined) {
    throw new Error('useCtx must be used within a Provider')
  }

  return ctx
}

export { PromptProvider, usePrompt }
