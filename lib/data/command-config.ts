// Band options
export const BANDS = [
  { value: '2.4GWIFI', label: '2.4GWIFI' },
  { value: '5GWIFI(5150-5250MHz)', label: '5GWIFI (5150-5250MHz)' },
  { value: '5GWIFI(5250-5350MHz)', label: '5GWIFI (5250-5350MHz)' },
  { value: '5GWIFI(5470-5725MHz)', label: '5GWIFI (5470-5725MHz)' },
  { value: '5GWIFI(5725-5850MHz)', label: '5GWIFI (5725-5850MHz)' },
] as const

// Standards available for each band
export const STANDARDS: Record<string, Array<{ value: string; label: string }>> = {
  '2.4GWIFI': [
    { value: '802.11b', label: '802.11b' },
    { value: '802.11g', label: '802.11g' },
    { value: '802.11n20', label: '802.11n20' },
    { value: '802.11n40', label: '802.11n40' },
  ],
  '5GWIFI(5150-5250MHz)': [
    { value: '802.11a', label: '802.11a' },
    { value: '802.11n20', label: '802.11n20' },
    { value: '802.11n40', label: '802.11n40' },
    { value: '802.11ac20', label: '802.11ac20' },
    { value: '802.11ac40', label: '802.11ac40' },
    { value: '802.11ac80', label: '802.11ac80' },
  ],
  '5GWIFI(5250-5350MHz)': [
    { value: '802.11a', label: '802.11a' },
    { value: '802.11n20', label: '802.11n20' },
    { value: '802.11n40', label: '802.11n40' },
    { value: '802.11ac20', label: '802.11ac20' },
    { value: '802.11ac40', label: '802.11ac40' },
    { value: '802.11ac80', label: '802.11ac80' },
  ],
  '5GWIFI(5470-5725MHz)': [
    { value: '802.11a', label: '802.11a' },
    { value: '802.11n20', label: '802.11n20' },
    { value: '802.11n40', label: '802.11n40' },
    { value: '802.11ac20', label: '802.11ac20' },
    { value: '802.11ac40', label: '802.11ac40' },
    { value: '802.11ac80', label: '802.11ac80' },
  ],
  '5GWIFI(5725-5850MHz)': [
    { value: '802.11a', label: '802.11a' },
    { value: '802.11n20', label: '802.11n20' },
    { value: '802.11n40', label: '802.11n40' },
    { value: '802.11ac20', label: '802.11ac20' },
    { value: '802.11ac40', label: '802.11ac40' },
    { value: '802.11ac80', label: '802.11ac80' },
  ],
}

// Modes
export const MODES = [
  { value: 'tx', label: 'TX Mode' },
  { value: 'rx', label: 'RX Mode' },
  { value: 'single-carrier', label: 'Single-carrier Mode' },
] as const

// Channels by band and standard
export const CHANNELS: Record<string, Record<string, Array<{ value: string; label: string }>>> = {
  '2.4GWIFI': {
    '802.11b': [
      { value: '1', label: 'Channel 1' },
      { value: '7', label: 'Channel 7' },
      { value: '13', label: 'Channel 13' },
    ],
    '802.11g': [
      { value: '1', label: 'Channel 1' },
      { value: '7', label: 'Channel 7' },
      { value: '13', label: 'Channel 13' },
    ],
    '802.11n20': [
      { value: '1', label: 'Channel 1' },
      { value: '7', label: 'Channel 7' },
      { value: '13', label: 'Channel 13' },
    ],
    '802.11n40': [
      { value: '3', label: 'Channel 3' },
      { value: '7', label: 'Channel 7' },
      { value: '11', label: 'Channel 11' },
    ],
  },
  '5GWIFI(5150-5250MHz)': {
    '802.11a': [
      { value: '36', label: 'Channel 36' },
      { value: '40', label: 'Channel 40' },
      { value: '48', label: 'Channel 48' },
    ],
    '802.11n20': [
      { value: '36', label: 'Channel 36' },
      { value: '40', label: 'Channel 40' },
      { value: '48', label: 'Channel 48' },
    ],
    '802.11n40': [
      { value: '38', label: 'Channel 38' },
      { value: '46', label: 'Channel 46' },
    ],
    '802.11ac20': [
      { value: '36', label: 'Channel 36' },
      { value: '40', label: 'Channel 40' },
      { value: '48', label: 'Channel 48' },
    ],
    '802.11ac40': [
      { value: '38', label: 'Channel 38' },
      { value: '46', label: 'Channel 46' },
    ],
    '802.11ac80': [{ value: '42', label: 'Channel 42' }],
  },
  '5GWIFI(5250-5350MHz)': {
    '802.11a': [
      { value: '52', label: 'Channel 52' },
      { value: '60', label: 'Channel 60' },
      { value: '64', label: 'Channel 64' },
    ],
    '802.11n20': [
      { value: '52', label: 'Channel 52' },
      { value: '60', label: 'Channel 60' },
      { value: '64', label: 'Channel 64' },
    ],
    '802.11n40': [
      { value: '54', label: 'Channel 54' },
      { value: '62', label: 'Channel 62' },
    ],
    '802.11ac20': [
      { value: '52', label: 'Channel 52' },
      { value: '60', label: 'Channel 60' },
      { value: '64', label: 'Channel 64' },
    ],
    '802.11ac40': [
      { value: '54', label: 'Channel 54' },
      { value: '62', label: 'Channel 62' },
    ],
    '802.11ac80': [{ value: '58', label: 'Channel 58' }],
  },
  '5GWIFI(5470-5725MHz)': {
    '802.11a': [
      { value: '100', label: 'Channel 100' },
      { value: '120', label: 'Channel 120' },
      { value: '140', label: 'Channel 140' },
      { value: '144', label: 'Channel 144' },
    ],
    '802.11n20': [
      { value: '100', label: 'Channel 100' },
      { value: '120', label: 'Channel 120' },
      { value: '140', label: 'Channel 140' },
      { value: '144', label: 'Channel 144' },
    ],
    '802.11n40': [
      { value: '102', label: 'Channel 102' },
      { value: '126', label: 'Channel 126' },
      { value: '134', label: 'Channel 134' },
      { value: '142', label: 'Channel 142' },
    ],
    '802.11ac20': [
      { value: '100', label: 'Channel 100' },
      { value: '120', label: 'Channel 120' },
      { value: '140', label: 'Channel 140' },
      { value: '144', label: 'Channel 144' },
    ],
    '802.11ac40': [
      { value: '102', label: 'Channel 102' },
      { value: '126', label: 'Channel 126' },
      { value: '134', label: 'Channel 134' },
      { value: '142', label: 'Channel 142' },
    ],
    '802.11ac80': [
      { value: '106', label: 'Channel 106' },
      { value: '138', label: 'Channel 138' },
    ],
  },
  '5GWIFI(5725-5850MHz)': {
    '802.11a': [
      { value: '149', label: 'Channel 149' },
      { value: '157', label: 'Channel 157' },
      { value: '165', label: 'Channel 165' },
    ],
    '802.11n20': [
      { value: '149', label: 'Channel 149' },
      { value: '157', label: 'Channel 157' },
      { value: '165', label: 'Channel 165' },
    ],
    '802.11n40': [
      { value: '151', label: 'Channel 151' },
      { value: '159', label: 'Channel 159' },
    ],
    '802.11ac20': [
      { value: '149', label: 'Channel 149' },
      { value: '157', label: 'Channel 157' },
      { value: '165', label: 'Channel 165' },
    ],
    '802.11ac40': [
      { value: '151', label: 'Channel 151' },
      { value: '159', label: 'Channel 159' },
    ],
    '802.11ac80': [{ value: '155', label: 'Channel 155' }],
  },
}

// Rates by standard (not applicable for single-carrier mode)
export const RATES: Record<string, Array<{ value: string; label: string; rateCmd: string }>> = {
  '802.11b': [
    { value: 'CCK-1M', label: 'CCK-1M', rateCmd: 'nrate -r 1' },
    { value: 'CCK-11M', label: 'CCK-11M', rateCmd: 'nrate -r 11' },
  ],
  '802.11g': [
    { value: 'OFDM-6M', label: 'OFDM-6M', rateCmd: 'nrate -r 6' },
    { value: 'OFDM-54M', label: 'OFDM-54M', rateCmd: 'nrate -r 54' },
  ],
  '802.11a': [
    { value: 'OFDM-6M', label: 'OFDM-6M', rateCmd: 'nrate -r 6' },
    { value: 'OFDM-54M', label: 'OFDM-54M', rateCmd: 'nrate -r 54' },
  ],
  '802.11n20': [
    { value: 'HT MCS0', label: 'HT MCS0', rateCmd: 'nrate -m 0' },
    { value: 'HT MCS7', label: 'HT MCS7', rateCmd: 'nrate -m 7' },
  ],
  '802.11n40': [
    { value: 'HT MCS0', label: 'HT MCS0', rateCmd: 'nrate -m 0' },
    { value: 'HT MCS7', label: 'HT MCS7', rateCmd: 'nrate -m 7' },
  ],
  '802.11ac20': [
    { value: 'VHT MCS0', label: 'VHT MCS0', rateCmd: 'nrate -m 0' },
    { value: 'VHT MCS7', label: 'VHT MCS7', rateCmd: 'nrate -m 7' },
  ],
  '802.11ac40': [
    { value: 'VHT MCS0', label: 'VHT MCS0', rateCmd: 'nrate -m 0' },
    { value: 'VHT MCS7', label: 'VHT MCS7', rateCmd: 'nrate -m 7' },
  ],
  '802.11ac80': [
    { value: 'VHT MCS0', label: 'VHT MCS0', rateCmd: 'nrate -m 0' },
    { value: 'VHT MCS7', label: 'VHT MCS7', rateCmd: 'nrate -m 7' },
  ],
}

// Standard configuration for nmode/vhtmode/gmode settings
export const STANDARD_CONFIG: Record<
  string,
  { nmode: string; vhtmode: string; gmode?: string; bandwidth?: string }
> = {
  '802.11b': { nmode: '0', vhtmode: '0' },
  '802.11g': { nmode: '0', vhtmode: '0', gmode: '1' },
  '802.11a': { nmode: '0', vhtmode: '0' },
  '802.11n20': { nmode: '1', vhtmode: '0', bandwidth: '20' },
  '802.11n40': { nmode: '1', vhtmode: '0', bandwidth: '40' },
  '802.11ac20': { nmode: '0', vhtmode: '1', bandwidth: '20' },
  '802.11ac40': { nmode: '0', vhtmode: '1', bandwidth: '40' },
  '802.11ac80': { nmode: '0', vhtmode: '1', bandwidth: '80' },
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
  const config = STANDARD_CONFIG[standard]

  // Common before commands
  const commonBefore = ['pkteng_stop tx', 'up', 'down', 'mpc 0', 'phy_watchdog 0', 'country DE']

  // Build chanspec based on bandwidth
  let chanspec = channel
  if (config.bandwidth) {
    chanspec = `${channel}/${config.bandwidth}`
  }

  // Single-carrier mode has different command structure
  if (mode === 'single-carrier') {
    const bandCmd = band.startsWith('2.4') ? 'band b' : 'band a'
    const nmodeValue = band.startsWith('5GWIFI') && standard === '802.11a' ? '-1' : config.nmode

    const commands = [
      ...commonBefore,
      bandCmd,
      'mpc 0',
      'scansuppress 1',
      'country DE',
      'mtool 1',
      `nmode ${nmodeValue}`,
      `vhtmode ${config.vhtmode}`,
    ]

    if (config.gmode) {
      commands.push(`gmode ${config.gmode}`)
    }

    commands.push(`chanspec ${chanspec}`, `txpwr1 -o -d ${txPower}`)

    return commands
  }

  // TX/RX mode commands
  const commands = [...commonBefore]

  // For 802.11g, add these commands in specific order
  if (standard === '802.11g') {
    commands.push(
      'mimo_txbw 4',
      'txchain 1',
      `nmode ${config.nmode}`,
      `vhtmode ${config.vhtmode}`,
      `gmode ${config.gmode}`,
      'reg set DE',
      `chanspec ${chanspec}`
    )
  } else {
    commands.push('mimo_txbw 4', 'txchain 1', `nmode ${config.nmode}`, `vhtmode ${config.vhtmode}`)

    // Add reg set DE for standards that need it (n and ac modes)
    if (standard.includes('n') || standard.includes('ac')) {
      commands.push('reg set DE')
    }

    commands.push(`chanspec ${chanspec}`)
  }

  // Add rate command
  const rateConfig = RATES[standard]?.find((r) => r.value === rate)
  if (rateConfig) {
    commands.push(rateConfig.rateCmd)
  }

  // Common after commands
  const commonAfter = [
    'up',
    'phy_forcecal 1',
    'scansuppress 1',
    'phy_txpwrctrl 1',
    `txpwr1 -o -d ${txPower}`,
    `pkteng_start 00:11:22:33:44:55 ${mode} 100 1024 0`,
  ]

  commands.push(...commonAfter)

  return commands
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
