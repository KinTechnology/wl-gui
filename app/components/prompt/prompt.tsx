import { useState } from 'react'
import { BaseInputProps as BasePromptProps } from '../prompt'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'

export type InputProps = Pick<BasePromptProps, 'title' | 'message' | 'onConfirm' | 'onCancel'>

function PromptDialog({ input, onClose }: { input?: InputProps; onClose?: () => void }) {
  const [inputText, setInputText] = useState('')

  return (
    <Dialog
      open
      modal
      onOpenChange={(open) => {
        if (!open) {
          onClose?.()
        }
      }}
    >
      <DialogContent className="text-gray-2">
        {input == null ? null : (
          <>
            <DialogTitle>{input.title}</DialogTitle>
            <DialogDescription>{input?.message}</DialogDescription>

            <div>
              <Input placeholder="Enter your input" value={inputText} onChange={(e) => setInputText(e.target.value)} />
            </div>

            <DialogFooter className="*:grow *:shrink-0">
              <Button
                variant="secondary"
                onClick={() => {
                  onClose?.()
                  input.onCancel?.()
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  onClose?.()
                  input.onConfirm?.(inputText)
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { PromptDialog }
