import { useStore } from '../store'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'

function ChannelModal() {
  const { modal, setModal, setLogs } = useStore()

  return (
    <Dialog
      modal
      open={modal === 'channel'}
      onOpenChange={(open) => {
        if (open == false) {
          setModal('')
        }
      }}
    >
      <DialogContent>
        <DialogHeader>Channel</DialogHeader>

        <div className="grid grid-cols-2 gap-4 p-4">
          {[
            { label: 'Channel 1', value: '' },
            { label: 'Channel 3', value: '' },
            { label: 'Channel 4', value: '' },
            { label: 'Channel 5', value: '' },
            { label: 'Channel 6', value: '' },
          ].map(({ label }) => (
            <Button
              key={label}
              onClick={() => {
                setLogs([`Channel changed to '${label}'`])
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ChannelModal }
