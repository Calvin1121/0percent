// const dateFormat = (time, pattern='yyy-mm-dd') => {
//  if(!time){ return ''}
//     let dt = new Date(time.replace(/\-/gi,'/'))
//     //yyy---mm-dd
//     let y = dt.getFullYear() //得到年份
//     let m = dt.getMonth() + 1 //得到月份
//     let d = dt.getDate() //得到日期
//     // return y + '-' + m + '-' + d



//     if (pattern.toLowerCase() === "yyy-mm-dd") {
//         return `${y}-${m}-${d}`
//     } else {
//         let hh = dt.getHours() //得到时
//         let mm = dt.getMinutes() //得到分
//         let ss = dt.getSeconds() //得到秒
//         return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
//     }
// }
const dateFormat = (date, fmt = 'yyyy-MM-dd') => {
    if (isNaN(date) && date) {
        date = new Date(date.replace(/\-/gi, '/'))
    } else if(!isNaN(date) && date) {
        date = new Date(date)
    }else if(!date){
        date = new Date()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
const padLeftZero = (str) => {
    return ('00' + str).substr(str.length)
}
export {
    dateFormat
}