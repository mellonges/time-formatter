import chalk from "chalk";


const regExp = /(\d+(\.\d+)?)\s*(s|m|h|D|M|Y)/

let v = 1

const keysValues = {
    s: v *= 1000,
    m: v *= 60,
    h: v *= 60,
    D: v *= 24,
    M: v *= 30,
    Y: v *= 12
}

const keysDels = {
    s: 1 / keysValues.s,
    m: 1 / keysValues.m,
    h: 1 / keysValues.h,
    D: 1 / keysValues.D,
    M: 1 / keysValues.M,
    Y: 1 / keysValues.Y,
}

 function strToTime(str = '') {
    let sum = 0

    /** @type {RegExpExecArray} */
    let array = null

    while (array = regExp.exec(str)) {
        const [find, ...args] = array
        const num = args.shift()
        const key = args.pop()

        str = str.replace(find, '')
        sum += +num * (keysValues[key] || 0)
    }

    return sum
}
//
const time = strToTime('2D 1D 32h 12m')


 export function timeStampToDate(time) {
     let v = 1
     const keysValues = {
         s: v *= 1000,
         m: v *= 60,
         h: v *= 60,
         D: v *= 24,
         M: v *= 30,
         Y: v *= 12
     }

     const keysDels = {
         s: 1 / keysValues.s,
         m: 1 / keysValues.m,
         h: 1 / keysValues.h,
         D: 1 / keysValues.D,
         M: 1 / keysValues.M,
         Y: 1 / keysValues.Y,
     }
    const object = {
        s: (time * keysDels.s | 0) % 60,
        m: (time * keysDels.m | 0) % 60,
        h: (time * keysDels.h | 0) % 24,
        D: (time * keysDels.D | 0) % 30,
        M: (time * keysDels.M | 0) % 12,
        Y: (time * keysDels.Y | 0)
    }

    return (
        Object.keys(object)
            .reverse()
            .map(e => ({key: e, value: object[e]}))
            .filter(e => e.value)
            .map(e => `${e.value}${e.key}`)
            .join(' ').trim() || 'Now!'
    )
}

console.log(`unix time: ${chalk.red(strToTime(process.argv[2]))} \n format time: ${chalk.yellowBright(timeStampToDate(strToTime(process.argv[2])))}`)
