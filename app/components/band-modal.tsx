import { useStore } from '../store'
import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader } from './ui/dialog'

function BandModal() {
  const { modal, setModal, setLogs } = useStore()

  return (
    <Dialog
      modal
      open={modal === 'band'}
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
            { label: '2.4GHz', value: '' },
            { label: '5GHz', value: '' },
            { label: 'Auto', value: '' },
          ].map(({ label }) => (
            <DialogClose asChild>
              <Button
                key={label}
                onClick={() => {
                  setLogs([`Band Width changed to '${label}'`])
                }}
              >
                {label}
              </Button>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { BandModal }
