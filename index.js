const Calendar = function(){
  this.timeZone = 'UTC'
};

Calendar.prototype.getWeek = function(year, month , day) {
  let curr = new Date(year, month , day)

  let week = []
  const actualMonth = curr.getMonth();

  console.log(actualMonth)

  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i
    let day = new Date(curr.setDate(first))

    const isThisMonth = day.getMonth() == actualMonth

    week.push({
      fullDate: day, 
      day: day.getDate(), 
      weekday: day.getDay(),
      month: day.getMonth(),
      year: day.getFullYear(),
      isThisMonth: isThisMonth
    })
  }

  return week
}

Calendar.prototype.getMonth = function(date){
  const curr = new Date(date)
  console.log(curr)

  const year = curr.getFullYear()
  const month = curr.getMonth()
  const day = curr.getDate()

  console.table(this.getWeek(year, month , day))
}

var test = new Calendar()
test.getMonth(new Date('2019-10-01'))