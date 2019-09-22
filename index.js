// Calendar init
const Calendar = function () {
  // Timezone
  this.timeZone = 'UTC';
  // Locale
  this.locale = 'en-EN';
  // get today
  this.today = {
    dayOfMonth: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  }
};

// Get dayweeks
Calendar.prototype.getWeek = function (year, month, day) {
  let curr = new Date(year, month, day)

  let week = []

  for (let i = 0; i < 7; i++) {
    let first = curr.getDate() - curr.getDay() + i
    let day = new Date(curr.setDate(first))

    const { isToDay } = this.checkDayAndMonth(day)
    const isThisMonth = curr.getMonth() == day.getMonth()

    console.log("curr.getMonth() >>>> ", curr.getMonth())
    console.log("day.getMonth() >>>> ", day.getMonth())

    week.push({
      fullDate: day,
      day: day.getDate(),
      weekday: day.getDay(),
      month: day.getMonth(),
      year: day.getFullYear(),
      isToDay: isToDay,
      isThisMonth: isThisMonth
    })
  }

  return week
}

// Check if entry is a valid Date object
Calendar.prototype.isDateObject = function(input) {
  const isDateObject = Object.prototype.toString.call(input) === "[object Date]"
  return isDateObject ? input : new Date(input)
}

// Compare date to today's day and month
Calendar.prototype.checkDayAndMonth = function (date) {
  const day = new Date(date).getDate() == this.today.dayOfMonth
  const month = new Date(date).getMonth() == this.today.month
  const year = new Date(date).getFullYear() == this.today.year

  const isToDay = day && month && year
  const isThisMonth = month && year

  return {
    isToDay: isToDay,
    isThisMonth: isThisMonth
  }
}

// Get days of month
Calendar.prototype.getMonth = function (date) {
  const curr = this.isDateObject(date);
  console.log(this.isDateObject(date))

  const year = curr.getFullYear();
  const month = curr.getMonth();

  let dates = []

  let i = 1
  while (i < this.getDaysInMonth(month, year)) {
    dates.push(this.getWeek(year, month, i))
    i = i + 7
    console.log(i)
  } 

  return dates.flat()
}

// Get month Name
Calendar.prototype.displayMonthName = function (date) {
  return new Date(date).toLocaleString(this.locale, { timeZone: this.timeZone, month: "long" });
}

// Get numbre of days in month
Calendar.prototype.getDaysInMonth = function (month, year) {
  return new Date(year, month, 0).getDate();
};

// DOM manipulation
function displayCalendar(selectedDate) {

  const test = new Calendar()

  const thisCalendar = document.getElementById("calendarThis");
  const calendarTitle = thisCalendar.getElementsByClassName("calendar-header-title")[0];

  calendarTitle.innerHTML = `${test.displayMonthName(selectedDate)}`

  const dates = test.getMonth(selectedDate)
  const dayGrid = thisCalendar.getElementsByClassName("calendar-weekdays-grid");

  let output = '';
  dates.forEach(el => {
    const isDisabled = el.isThisMonth ? '' : 'disabled';
    const isToday = el.isToDay ? 'isToday' : '';
    output += `
    <li>
      <button class="${isToday}" ${isDisabled}>${el.day}</button>
    </li>`;
  })

  dayGrid[0].innerHTML = output
}
const selectedDate = new Date()

displayCalendar(selectedDate)
