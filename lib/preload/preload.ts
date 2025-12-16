import { execAsync } from "../exec-async"

window.execAsync = execAsync

declare global {
  interface Window {
    execAsync: typeof execAsync
  }
}
