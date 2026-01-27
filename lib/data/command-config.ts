// Types
type SelectOption = { value: string; label: string }
type RateOption = SelectOption & { rateCmd: string }

type StandardConfig = {
  value: string
  label: string
  // Command building parameters
  nmode: string
  vhtmode: string
  gmode?: string // only 802.11g has this
  bandwidth?: string // '20' | '40' | '80' - for chanspec suffix
  // Derived data
  bands: SelectOption[]
  rateKey: keyof typeof RATES // reference to rates map
}

// Band constants (reusable)
const BAND_2_4G: SelectOption = { value: '2.4GWIFI', label: '2.4GWIFI' }
const BAND_5G_LOW: SelectOption = { value: '5GWIFI(5150-5250MHz)', label: '5GWIFI (5150-5250MHz)' }
const BAND_5G_MID_LOW: SelectOption = { value: '5GWIFI(5250-5350MHz)', label: '5GWIFI (5250-5350MHz)' }
const BAND_5G_MID_HIGH: SelectOption = { value: '5GWIFI(5470-5725MHz)', label: '5GWIFI (5470-5725MHz)' }
const BAND_5G_HIGH: SelectOption = { value: '5GWIFI(5725-5850MHz)', label: '5GWIFI (5725-5850MHz)' }
const ALL_5G_BANDS: SelectOption[] = [BAND_5G_LOW, BAND_5G_MID_LOW, BAND_5G_MID_HIGH, BAND_5G_HIGH]

// Rate options map (reusable)
export const RATES = {
  cck: [
    { value: 'CCK-1M', label: 'CCK-1M', rateCmd: 'nrate -r 1' },
    { value: 'CCK-11M', label: 'CCK-11M', rateCmd: 'nrate -r 11' },
  ],
  ofdm: [
    { value: 'OFDM-6M', label: 'OFDM-6M', rateCmd: 'nrate -r 6' },
    { value: 'OFDM-54M', label: 'OFDM-54M', rateCmd: 'nrate -r 54' },
  ],
  ht: [
    { value: 'HT MCS0', label: 'HT MCS0', rateCmd: 'nrate -m 0' },
    { value: 'HT MCS7', label: 'HT MCS7', rateCmd: 'nrate -m 7' },
  ],
  vht: [
    { value: 'VHT MCS0', label: 'VHT MCS0', rateCmd: 'nrate -m 0' },
    { value: 'VHT MCS7', label: 'VHT MCS7', rateCmd: 'nrate -m 7' },
  ],
} as const satisfies Record<string, RateOption[]>

// Get rates by key
export function getRatesByKey(key: keyof typeof RATES): RateOption[] {
  return [...RATES[key]]
}

// Standards as root with embedded config
export const STANDARDS: StandardConfig[] = [
  {
    value: '802.11b',
    label: '802.11b',
    nmode: '0',
    vhtmode: '0',
    bands: [BAND_2_4G],
    rateKey: 'cck',
  },
  {
    value: '802.11g',
    label: '802.11g',
    nmode: '0',
    vhtmode: '0',
    gmode: '1',
    bands: [BAND_2_4G],
    rateKey: 'ofdm',
  },
  {
    value: '802.11a',
    label: '802.11a',
    nmode: '0',
    vhtmode: '0',
    bands: [...ALL_5G_BANDS],
    rateKey: 'ofdm',
  },
  {
    value: '802.11n20',
    label: '802.11n20',
    nmode: '1',
    vhtmode: '0',
    bandwidth: '20',
    bands: [BAND_2_4G, ...ALL_5G_BANDS],
    rateKey: 'ht',
  },
  {
    value: '802.11n40',
    label: '802.11n40',
    nmode: '1',
    vhtmode: '0',
    bandwidth: '40',
    bands: [BAND_2_4G, ...ALL_5G_BANDS],
    rateKey: 'ht',
  },
  {
    value: '802.11ac20',
    label: '802.11ac20',
    nmode: '0',
    vhtmode: '1',
    bandwidth: '20',
    bands: [...ALL_5G_BANDS],
    rateKey: 'vht',
  },
  {
    value: '802.11ac40',
    label: '802.11ac40',
    nmode: '0',
    vhtmode: '1',
    bandwidth: '40',
    bands: [...ALL_5G_BANDS],
    rateKey: 'vht',
  },
  {
    value: '802.11ac80',
    label: '802.11ac80',
    nmode: '0',
    vhtmode: '1',
    bandwidth: '80',
    bands: [...ALL_5G_BANDS],
    rateKey: 'vht',
  },
]

// Modes (independent)
export const MODES = [
  { value: 'tx', label: 'TX Mode' },
  { value: 'rx', label: 'RX Mode' },
  { value: 'single-carrier', label: 'Single-carrier Mode' },
] as const

// Channels indexed by (Standard, Band)
export const CHANNELS: Record<string, Record<string, SelectOption[]>> = {
  '802.11b': {
    '2.4GWIFI': [
      { value: '1', label: 'Channel 1' },
      { value: '3', label: 'Channel 3' },
      { value: '7', label: 'Channel 7' },
      { value: '11', label: 'Channel 11' },
      { value: '13', label: 'Channel 13' },
    ],
  },
  '802.11g': {
    '2.4GWIFI': [
      { value: '1', label: 'Channel 1' },
      { value: '3', label: 'Channel 3' },
      { value: '7', label: 'Channel 7' },
      { value: '11', label: 'Channel 11' },
      { value: '13', label: 'Channel 13' },
    ],
  },
  '802.11a': {
    '5GWIFI(5150-5250MHz)': [
      { value: '36', label: 'Channel 36' },
      { value: '40', label: 'Channel 40' },
      { value: '48', label: 'Channel 48' },
    ],
    '5GWIFI(5250-5350MHz)': [
      { value: '52', label: 'Channel 52' },
      { value: '60', label: 'Channel 60' },
      { value: '64', label: 'Channel 64' },
    ],
    '5GWIFI(5470-5725MHz)': [
      { value: '100', label: 'Channel 100' },
      { value: '120', label: 'Channel 120' },
      { value: '140', label: 'Channel 140' },
      { value: '144', label: 'Channel 144' },
    ],
    '5GWIFI(5725-5850MHz)': [
      { value: '149', label: 'Channel 149' },
      { value: '157', label: 'Channel 157' },
      { value: '165', label: 'Channel 165' },
    ],
  },
  '802.11n20': {
    '2.4GWIFI': [
      { value: '1', label: 'Channel 1' },
      { value: '3', label: 'Channel 3' },
      { value: '7', label: 'Channel 7' },
      { value: '11', label: 'Channel 11' },
      { value: '13', label: 'Channel 13' },
    ],
    '5GWIFI(5150-5250MHz)': [
      { value: '36', label: 'Channel 36' },
      { value: '40', label: 'Channel 40' },
      { value: '48', label: 'Channel 48' },
    ],
    '5GWIFI(5250-5350MHz)': [
      { value: '52', label: 'Channel 52' },
      { value: '60', label: 'Channel 60' },
      { value: '64', label: 'Channel 64' },
    ],
    '5GWIFI(5470-5725MHz)': [
      { value: '100', label: 'Channel 100' },
      { value: '120', label: 'Channel 120' },
      { value: '140', label: 'Channel 140' },
      { value: '144', label: 'Channel 144' },
    ],
    '5GWIFI(5725-5850MHz)': [
      { value: '149', label: 'Channel 149' },
      { value: '157', label: 'Channel 157' },
      { value: '165', label: 'Channel 165' },
    ],
  },
  '802.11n40': {
    '2.4GWIFI': [
      { value: '1', label: 'Channel 1' },
      { value: '3', label: 'Channel 3' },
      { value: '7', label: 'Channel 7' },
      { value: '11', label: 'Channel 11' },
      { value: '13', label: 'Channel 13' },
    ],
    '5GWIFI(5150-5250MHz)': [
      { value: '38', label: 'Channel 38' },
      { value: '46', label: 'Channel 46' },
    ],
    '5GWIFI(5250-5350MHz)': [
      { value: '54', label: 'Channel 54' },
      { value: '62', label: 'Channel 62' },
    ],
    '5GWIFI(5470-5725MHz)': [
      { value: '102', label: 'Channel 102' },
      { value: '126', label: 'Channel 126' },
      { value: '134', label: 'Channel 134' },
      { value: '142', label: 'Channel 142' },
    ],
    '5GWIFI(5725-5850MHz)': [
      { value: '151', label: 'Channel 151' },
      { value: '159', label: 'Channel 159' },
    ],
  },
  '802.11ac20': {
    '5GWIFI(5150-5250MHz)': [
      { value: '36', label: 'Channel 36' },
      { value: '40', label: 'Channel 40' },
      { value: '48', label: 'Channel 48' },
    ],
    '5GWIFI(5250-5350MHz)': [
      { value: '52', label: 'Channel 52' },
      { value: '60', label: 'Channel 60' },
      { value: '64', label: 'Channel 64' },
    ],
    '5GWIFI(5470-5725MHz)': [
      { value: '100', label: 'Channel 100' },
      { value: '120', label: 'Channel 120' },
      { value: '140', label: 'Channel 140' },
      { value: '144', label: 'Channel 144' },
    ],
    '5GWIFI(5725-5850MHz)': [
      { value: '149', label: 'Channel 149' },
      { value: '157', label: 'Channel 157' },
      { value: '165', label: 'Channel 165' },
    ],
  },
  '802.11ac40': {
    '5GWIFI(5150-5250MHz)': [
      { value: '38', label: 'Channel 38' },
      { value: '46', label: 'Channel 46' },
    ],
    '5GWIFI(5250-5350MHz)': [
      { value: '54', label: 'Channel 54' },
      { value: '62', label: 'Channel 62' },
    ],
    '5GWIFI(5470-5725MHz)': [
      { value: '102', label: 'Channel 102' },
      { value: '126', label: 'Channel 126' },
      { value: '134', label: 'Channel 134' },
      { value: '142', label: 'Channel 142' },
    ],
    '5GWIFI(5725-5850MHz)': [
      { value: '151', label: 'Channel 151' },
      { value: '159', label: 'Channel 159' },
    ],
  },
  '802.11ac80': {
    '5GWIFI(5150-5250MHz)': [{ value: '42', label: 'Channel 42' }],
    '5GWIFI(5250-5350MHz)': [{ value: '58', label: 'Channel 58' }],
    '5GWIFI(5470-5725MHz)': [
      { value: '106', label: 'Channel 106' },
      { value: '138', label: 'Channel 138' },
    ],
    '5GWIFI(5725-5850MHz)': [{ value: '155', label: 'Channel 155' }],
  },
}

// Helper functions

// Get standard config by value
export function getStandardConfig(standard: string): StandardConfig | undefined {
  return STANDARDS.find((s) => s.value === standard)
}

// Get all standards as select options
export function getStandardOptions(): SelectOption[] {
  return STANDARDS.map((s) => ({ value: s.value, label: s.label }))
}

// Get possible bands for a standard
export function getPossibleBands(standard: string): SelectOption[] {
  return getStandardConfig(standard)?.bands ?? []
}

// Get possible channels for a standard + band combination
export function getPossibleChannels(standard: string, band: string): SelectOption[] {
  return CHANNELS[standard]?.[band] ?? []
}

// Get possible rates for a standard
export function getPossibleRates(standard: string): RateOption[] {
  const config = getStandardConfig(standard)
  if (!config) return []
  return getRatesByKey(config.rateKey)
}

// Get mode options
export function getModeOptions(): SelectOption[] {
  return [...MODES]
}

// Build commands based on selected parameters
export function buildCommands(params: {
  band: string
  standard: string
  mode: 'tx' | 'rx' | 'single-carrier'
  channel: string
  rate?: string
  txPower: number
}): string[] {
  const { band, standard, mode, channel, rate, txPower } = params
  const config = getStandardConfig(standard)!

  if (mode === 'single-carrier') {
    // Single-carrier mode has different command structure
    const bandCmd = band.startsWith('2.4') ? 'band b' : 'band a'

    const commands = ['down', bandCmd, 'up', 'out', `fqacurcy ${channel}`]
    return commands
  } else {
    // TX/RX mode commands
    const commands: string[] = []

    // Common before commands
    commands.push(...['pkteng_stop tx', 'up', 'down', 'mpc 0', 'phy_watchdog 0', 'country DE'])

    // For 802.11g, add these commands in specific order
    commands.push(
      'mimo_txbw 4',
      'txchain 1',
      `nmode ${config.nmode}`,
      `vhtmode ${config.vhtmode}`,
      `gmode ${config.gmode}`
    )

    if ('gmode' in config && config.gmode) {
      commands.push(`gmode ${config.gmode}`)
    }

    // Build chanspec based on bandwidth
    let chanspec = channel
    if ('bandwidth' in config && config.bandwidth) {
      chanspec = `${channel}/${config.bandwidth}`
    }

    commands.push('country DE', `chanspec ${chanspec}`)

    // Add rate command
    const rates = getRatesByKey(config.rateKey)
    const rateCmd = rates.find((r) => r.value === rate)?.rateCmd
    if (rateCmd) {
      commands.push(rateCmd)
    }

    // Common after commands
    commands.push(
      ...[
        'up',
        'phy_forcecal 1',
        'scansuppress 1',
        'phy_txpwrctrl 1',
        `txpwr1 -o -d ${txPower}`,
        `pkteng_start 00:11:22:33:44:55 ${mode} 100 1024 0`,
      ]
    )

    return commands
  }
}

// Get display label for current configuration
export function getConfigLabel(params: {
  band: string
  standard: string
  mode: 'tx' | 'rx' | 'single-carrier'
  channel: string
  rate?: string
}): string {
  const { band, standard, mode, channel, rate } = params

  if (mode === 'single-carrier') {
    return `${band} ${standard}; Single-carrier Mode; Channel ${channel}`
  }

  const modeLabel = mode === 'tx' ? 'TX Mode' : 'RX Mode'
  return `${band} ${standard} ${modeLabel}; Channel ${channel}; Rate: ${rate}`
}
