import * as React from 'react'

import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<React.ComponentProps<'select'>, 'children'> {
  options: SelectOption[]
  placeholder?: string
}

function Select({ className, options, placeholder, ...props }: SelectProps) {
  return (
    <select
      data-slot="select"
      className={cn(
        'h-9 w-full min-w-0 rounded-md border border-gray-7 bg-gray-9 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23888%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E")] bg-[length:12px] bg-[right_8px_center] bg-no-repeat pr-8',
        className
      )}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

export { Select }
export type { SelectOption, SelectProps }
