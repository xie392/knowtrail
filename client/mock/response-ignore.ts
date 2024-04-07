export function response<T>(res: T) {
  return { code: 200, data: res, msg: 'success' }
}

export function error<T>(res: T, msg?: string) {
  return { code: 500, data: res, msg: msg ?? 'error' }
}

