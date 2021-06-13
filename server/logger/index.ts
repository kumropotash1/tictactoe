const lpad = (val: number | string, length: number, char?: string): string => {
  val = String(val)

  if (length <= 0) {
    throw new Error('Expected length to be >= 0')
  }

  char = char || '0'
  if (char?.length > 1) {
    throw new Error('Expected a character, received a string')
  }

  return char.repeat(Math.max(length - val.length, 0)) + val
}

const formatLogTime = (time?: Date): string => {
  time = time || new Date()

  return `${time.getFullYear()}-${lpad(time.getMonth(), 2)}-${lpad(time.getDate(), 2)} ${lpad(time.getHours(), 2)}:${lpad(time.getMinutes(), 2)}:${lpad(time.getSeconds(), 2)}.${lpad(time.getMilliseconds(), 3)}`
}

const prepareLog = (sourceTag: string, message: string):string => {
  return `${formatLogTime()}  - [ ${sourceTag} ] - ${message}`
}

export const debug = (sourceTag: string, message: string, ...args: any[]) => {
  console.debug(prepareLog(sourceTag, message), ...args)
}

export const info = (sourceTag: string, message: string, ...args: any[]) => {
  console.info(prepareLog(sourceTag, message), ...args)
}

export const error = (sourceTag: string, message: string, ...args: any[]) => {
  console.error(prepareLog(sourceTag, message), ...args)
}

export default { debug, info, error }
