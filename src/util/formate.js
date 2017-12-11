import moment from 'moment'

function formate (value) {
  let num = value * 100
  return num.toFixed(2) + '%'
}

function timePretty (time) {
  return moment(parseInt(time)).format('YYYY-MM-DD HH:mm:ss')
}

export {
  formate,
  timePretty
}
