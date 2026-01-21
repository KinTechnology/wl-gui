import { exec } from 'child_process'
import util from 'util'

const _execAsync = util.promisify(exec)

class ExecError extends Error {
  constructor(
    public code: number,
    message?: string
  ) {
    super(message)
  }
}

const execAsync = async (bin: string, args: string[] = []) => {
  try {
    const command = import.meta.env.DEV ? ['echo', bin, args].join(' ') : ['sudo', bin, args].join(' ')

    const { stdout } = await _execAsync(command)

    return stdout.replace(/[\t\r]/g, '').trim()
  } catch (error) {
    if (error instanceof Error && 'stderr' in error && typeof error.stderr === 'string') {
      throw new ExecError((error as { code?: number }).code ?? 1, error.stderr)
    }

    throw error
  }
}

export { execAsync, type ExecError }
