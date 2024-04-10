
type obj = Record<string,  string | number>

const isArray = (target: string[]) => Object.prototype.toString.call(target) === '[object Array]'

const isObject = (target: obj) => typeof target === 'object' && target


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bemClass = (input: any[] = []) => {
  const blk = input[0]
  let elt = input[1]
  let mods = input[2]
  let className = input[3]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = []

  if (isArray(elt) || isObject(elt)) {
    className = mods
    mods = elt
    elt = ''
  }

  const eltClass = elt ? `${blk}__${elt}` : blk
  result.push(eltClass)

  if (isArray(mods)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mods.forEach((mod: any) => {
      const classStr = elt ? `${blk}__${elt}--${mod}` : `${blk}--${mod}`
      result.push(classStr)
    })
  }

  if (isObject(mods) && !isArray(mods)) {
    const modObjKeys = Object.keys(mods)
    modObjKeys.forEach((key) => {
      if (mods[key]) {
        const classStr = elt ? `${blk}__${elt}--${key}` : `${blk}--${key}`
        result.push(classStr)
      }
    })
  }

  if (className) {
    result.push(className)
  }

  return result.join(' ')
}

export {
  bemClass,
}
