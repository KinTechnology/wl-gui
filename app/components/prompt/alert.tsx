import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { BaseInputProps } from '../prompt'

export type AlertProps = Omit<BaseInputProps, 'onConfirm' | 'type'>

function AlertDialog({ input, onClose }: { input: AlertProps; onClose?: () => void }) {
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
        <DialogTitle>{input.title}</DialogTitle>
        <DialogDescription>{input?.message}</DialogDescription>

        <DialogFooter>
          <Button
            className="w-1/2"
            onClick={() => {
              onClose?.()
              input.onCancel?.()
            }}
          >
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { AlertDialog }
