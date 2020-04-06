let hourMs = 1000*60*60
let minuteMs = 1000*60
let minutesTextList = ['минута', 'минуты', 'минут']
let hoursTextList = ['час', 'часа', 'часов']
let daysTextList = ['день', 'дня', 'дней']

function getWord(number, textFormat) {
  number = Math.abs(number) % 100
  let numberMod = number % 10
  let res = ''
  if (number > 10 && number < 20)
    res = textFormat[2]
  else if (numberMod > 1 && numberMod < 5)
    res = textFormat[1]
  else if (numberMod === 1)
    res = textFormat[0]
  else
    res = textFormat[2];

  return `${number} ${res} назад`
}

function getDatePassed(date) {
  let passed = {
    minutes: 0,
    hours: 0,
    days: 0
  }

  passed.minutes = Math.floor((Date.now() - date) / 1000 / 60)

  if (passed.minutes >= 60){
    passed.hours = Math.floor(passed.minutes / 60)
    passed.minutes %= 60

    if (passed.hours >= 24) {
      passed.days = Math.floor(passed.hours / 24)
      passed.hours %= 24
      return getWord(passed.days, daysTextList)
    } else {
      return getWord(passed.hours, hoursTextList)
    }
  } else {
    return getWord(passed.minutes, minutesTextList)
  }
}

function getCommentId() {
  return Date.now().toString()
}

export { getDatePassed, getCommentId }
