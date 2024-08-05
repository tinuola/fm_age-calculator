// Elements

const inputDay = document.getElementById('input-day')
const inputMon = document.getElementById('input-month')
const inputYr = document.getElementById('input-year')

const displayDay = document.getElementById('display-day')
const displayMon = document.getElementById('display-month')
const displayYr = document.getElementById('display-year')

const formEle = document.getElementById('age-form')

// Today's date

// Logic
/* On submit, check:

Are fields empty?

If there's a year, there must be a month and a day
and year cannot be greater than current year

If there's a month, there must also be a day and month can't
be greater than 12

If there's a day, and it is not greater than 31, calculate

*/

function getSubmittedDate() {
  const submittedDate = new Date(
    `${inputMon.value} ${inputDay.value} ${inputYr.value}`
  )
  return submittedDate
}

// https://stackoverflow.com/a/20669357
// https://momentjs.com/docs/#/displaying/difference/
// https://www.timeanddate.com/date/durationresult.html

function calculateDates() {
  const today = new Date()

  const submittedDate = getSubmittedDate()

  const diff = new Date(today.getTime() - submittedDate.getTime())

  return {
    diffYear: diff.getUTCFullYear() - 1970,
    diffMonth: diff.getUTCMonth(),
    diffDay: diff.getUTCDate() - 1,
  }
}

const submitData = () => {
  console.log(getSubmittedDate())
  console.log(calculateDates())
}

formEle.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('submitted')
  submitData()
})

// function calcYear() {
//   const currYear = today.getFullYear()
//   const submittedDate = getSubmittedDate()
//   const parsedSubmittedYear = submittedDate.getFullYear()
//   return currYear - parsedSubmittedYear
// }

// function calcMonth() {
//   const currMonth = today.getMonth()
//   const submittedDate = getSubmittedDate()
//   const parsedSubmittedMonth = submittedDate.getMonth()
//   return currMonth - parsedSubmittedMonth
// }
