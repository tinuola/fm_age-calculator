// Form elements
const inputDy = document.getElementById('input-day')
const inputMn = document.getElementById('input-month')
const inputYr = document.getElementById('input-year')
const formEle = document.getElementById('age-form')

// Display elements
const displayDy = document.getElementById('display-day')
const displayMn = document.getElementById('display-month')
const displayYr = document.getElementById('display-year')

// Track input status
const validEntry = {}

// Current date
const today = new Date()

// Logic
/* On submit, check:

Are fields empty?

if only day is entered, and it is not greater than 31, calculate, set day status to valid, and return the input value; set month and year to current month and year; also day cannot be greater than today's number

If only month is entered, there must also be a (valid) day otherwise set day status to invalid; if there's no year, set year to current year; month can't be greater than 12, set month status to valid,  month cannot be greater than this month

If there's a year, there must be a valid month and a valid day
and year cannot be greater than current year, set error message on month and day (they're invalid)
*/

function parseSubmittedDay() {
  if (!inputDy.value) {
    validEntry.day = false
    errorMsg(inputDy, 'Enter day')
    return null
  }

  if (inputDy.value > today.getDate()) {
    validEntry.day = false
    errorMsg(inputDy, 'Must be in the past')
    return null
  }

  validEntry.day = true
  return inputDy.value
}

function parseSubmittedMonth() {
  const dayExists = parseSubmittedDay()

  if (dayExists && !inputMn.value) {
    validEntry.month = true
    return today.getMonth() + 1
  }

  if (!inputMn.value) {
    validEntry.month = false
    errorMsg(inputMn, 'Enter month')
    return null
  }

  if (inputMn.value > today.getMonth() + 1 && !inputYr.value) {
    validEntry.Month = false
    errorMsg(inputMn, 'Must be in the past')
    return null
  }

  validEntry.month = true
  return inputMn.value
  // return today.getMonth() + 1
}

function parseSubmittedYear() {
  const dayExists = parseSubmittedDay()
  const monthExists = parseSubmittedMonth()

  console.log(dayExists)
  console.log(monthExists)

  if (dayExists && monthExists && !inputYr.value) {
    validEntry.year = true
    return today.getFullYear()
  }

  if (!inputYr.value) {
    validEntry.year = false
    errorMsg(inputYr, 'Enter year')
    return null
  }

  if (inputYr.value > today.getFullYear()) {
    validEntry.year = false
    errorMsg(inputYr, 'Must be in the past')
    return null
  }

  validEntry.year = true
  return inputYr.value
  // return today.getFullYear()
}

function errorMsg(ele, msg) {
  // console.log(ele.nextElementSibling)
  return (ele.nextElementSibling.innerText = msg)
}

function parseFullSubmittedDate() {
  // const submittedDate = {}

  const parsedDay = parseSubmittedDay()
  const parsedMonth = parseSubmittedMonth()
  const parsedYear = parseSubmittedYear()

  // console.log(parsedDay, parsedMonth, parsedYear)

  if (parsedDay && parsedMonth && parsedYear) {
    // Month, day, year - new Date('5 20 1069')
    const submittedDate = new Date(`${parsedMonth} ${parsedDay} ${parsedYear}`)
    console.log(submittedDate)
    return submittedDate
  }

  // return test
}

// https://stackoverflow.com/a/20669357
// https://momentjs.com/docs/#/displaying/difference/
// https://www.timeanddate.com/date/durationresult.html

function calculateDates() {
  const submittedDate = parseFullSubmittedDate()
  // return submittedDate

  if (submittedDate) {
    const diff = new Date(today.getTime() - submittedDate.getTime())

    return {
      diffYear: diff.getUTCFullYear() - 1970,
      diffMonth: diff.getUTCMonth(),
      diffDay: diff.getUTCDate() - 1,
    }
  }
}

const submitDate = () => {
  // if (validEntry.day && validEntry.month && validEntry.year) {
  console.log('submitted')
  const test = calculateDates()
  console.log(test)
  // } else {
  //   displayError()
  // }
}

// formEle.addEventListener('input', (e) => {
//   console.log(e.target.name)
//   const { name, value } = e.target
// })

formEle.addEventListener('submit', (e) => {
  e.preventDefault()

  submitDate()
})
