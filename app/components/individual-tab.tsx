import { Loader2Icon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useStore } from '../store'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { BANDS, STANDARDS, MODES, CHANNELS, RATES, buildCommands, getConfigLabel } from '@/lib/data/command-config'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type SelectOption = { value: string; label: string }

function ButtonGroup({
  options,
  value,
  onChange,
  disabled,
}: {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          disabled={disabled}
          className={cn(
            'px-3 py-1.5 text-sm rounded-md border transition-colors',
            value === option.value
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-gray-7 border-gray-6 text-gray-3 hover:bg-gray-6',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function IndividualTab() {
  const { setLogs, action } = useStore()
  const [isRunning, setIsRunning] = useState(false)

  // Form state
  const [band, setBand] = useState<string>(BANDS[0].value)
  const [standard, setStandard] = useState('')
  const [mode, setMode] = useState<'tx' | 'rx' | 'single-carrier'>('tx')
  const [channel, setChannel] = useState('')
  const [rate, setRate] = useState('')
  const [txPower, setTxPower] = useState('15')
  const [txPowerError, setTxPowerError] = useState('')

  // Get available options based on current selections
  const availableStandards = STANDARDS[band] || []
  const availableChannels = CHANNELS[band]?.[standard] || []
  const availableRates = RATES[standard] || []
  const showRateSelector = mode !== 'single-carrier'

  // Reset dependent selections when parent changes
  useEffect(() => {
    const standards = STANDARDS[band] || []
    if (standards.length > 0 && !standards.find((s) => s.value === standard)) {
      setStandard(standards[0].value)
    }
  }, [band, standard])

  useEffect(() => {
    const channels = CHANNELS[band]?.[standard] || []
    if (channels.length > 0 && !channels.find((c) => c.value === channel)) {
      setChannel(channels[0].value)
    }
  }, [band, standard, channel])

  useEffect(() => {
    const rates = RATES[standard] || []
    if (rates.length > 0 && !rates.find((r) => r.value === rate)) {
      setRate(rates[0].value)
    }
  }, [standard, rate])

  // Validate TX power
  const validateTxPower = (value: string): boolean => {
    const num = parseFloat(value)
    if (isNaN(num)) {
      setTxPowerError('Please enter a valid number')
      return false
    }
    setTxPowerError('')
    return true
  }

  // Check if form is valid
  const isFormValid = band && standard && channel && txPower && !txPowerError && (mode === 'single-carrier' || rate)

  // Run command
  const handleRun = async () => {
    if (!validateTxPower(txPower)) return
    if (!isFormValid) return

    const txPowerNum = parseFloat(txPower)
    const commands = buildCommands({
      band,
      standard,
      mode,
      channel,
      rate: mode !== 'single-carrier' ? rate : undefined,
      txPower: txPowerNum,
    })

    const label = getConfigLabel({
      band,
      standard,
      mode,
      channel,
      rate: mode !== 'single-carrier' ? rate : undefined,
    })

    try {
      setIsRunning(true)
      action.increment()
      setLogs([`Running: ${label}`])

      const [command, ...restCommands] = commands
      setLogs([`running ${command}`])
      await window.execAsync('wl', [command]).catch(() => {})

      for (const cmd of restCommands) {
        // Add delays for specific commands
        if (cmd.startsWith('up') || cmd.startsWith('down')) {
          await sleep(3000)
        }
        if (cmd.startsWith('nrate')) {
          await sleep(2000)
        }

        setLogs([`running ${cmd}`])
        await sleep(1000)
        await window.execAsync('wl', [cmd]).catch((err: any) => {
          setLogs([`Error: ${err.message}`, `Error: exit code: ${err.code ?? 'unknown'}`, ''])
        })
      }

      setLogs([`Completed: ${label}`, ''])
    } catch (err: any) {
      setLogs([`Error: ${err.message}`, `Error: exit code: ${err.code ?? 'unknown'}`, ''])
    } finally {
      setIsRunning(false)
    }
  }

  const x = Boolean(0)

  return (
    <div className="bg-gray-8 overflow-scroll p-4">
      {/* Band Selection */}
      {x &&
        Array.from({ length: 30 }, (_, i) => i).map((i) => (
          <div className="h-7 bg-gray-7 border border-gray-4 rounded-lg px-3">{i + 1}</div>
        ))}
      {!x && (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-4">Band</label>
            <ButtonGroup options={[...BANDS]} value={band} onChange={setBand} disabled={isRunning} />
          </div>

          {/* Standard Selection */}
          <div className="flex flex-col gap-2 pt-4">
            <label className="text-sm font-medium text-gray-4">Standard</label>
            <ButtonGroup
              options={availableStandards}
              value={standard}
              onChange={setStandard}
              disabled={isRunning || availableStandards.length === 0}
            />
          </div>

          {/* Mode Selection */}
          <div className="flex flex-col gap-2 pt-4">
            <label className="text-sm font-medium text-gray-4">Mode</label>
            <ButtonGroup
              options={[...MODES]}
              value={mode}
              onChange={(v) => setMode(v as 'tx' | 'rx' | 'single-carrier')}
              disabled={isRunning}
            />
          </div>

          {/* Channel Selection */}
          <div className="flex flex-col gap-2 pt-4">
            <label className="text-sm font-medium text-gray-4">Channel</label>
            <ButtonGroup
              options={availableChannels}
              value={channel}
              onChange={setChannel}
              disabled={isRunning || availableChannels.length === 0}
            />
          </div>

          {/* Rate Selection (hidden for single-carrier mode) */}
          {showRateSelector && (
            <div className="flex flex-col gap-2 pt-4">
              <label className="text-sm font-medium text-gray-4">Rate</label>
              <ButtonGroup
                options={availableRates}
                value={rate}
                onChange={setRate}
                disabled={isRunning || availableRates.length === 0}
              />
            </div>
          )}

          {/* TX Power Input */}
          <div className="flex flex-col gap-1 pt-4">
            <label className="text-sm font-medium text-gray-4">TX Power</label>
            <Input
              type="number"
              value={txPower}
              onChange={(e) => {
                setTxPower(e.target.value)
                if (txPowerError) validateTxPower(e.target.value)
              }}
              onBlur={(e) => validateTxPower(e.target.value)}
              disabled={isRunning}
              placeholder="Enter TX Power value"
            />
            {txPowerError && <span className="text-xs text-red-500">{txPowerError}</span>}
          </div>

          {/* Run Button */}
          <div className="mt-auto pt-4">
            <Button className="w-full relative" onClick={handleRun} disabled={isRunning || !isFormValid}>
              <span className="relative inline-block">
                {isRunning ? (
                  <Loader2Icon className="right-full top-1/2 -translate-y-1/2 -translate-x-2 absolute animate-spin" />
                ) : null}
                {isRunning ? 'Running...' : 'Run'}
              </span>
            </Button>
          </div>

          {/* Current Configuration Preview */}
          {isFormValid && (
            <div className="text-xs text-gray-5 border-t border-gray-7 pt-4">
              <div className="font-medium mb-1">Configuration Preview:</div>
              <div className="font-mono break-all">
                {getConfigLabel({
                  band,
                  standard,
                  mode,
                  channel,
                  rate: mode !== 'single-carrier' ? rate : undefined,
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export { IndividualTab }
