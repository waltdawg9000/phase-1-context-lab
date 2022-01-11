/* Your Code Here */
function createEmployeeRecord(emp) {
  return {
       firstName: emp[0],
       familyName: emp[1],
       title: emp[2],
       payPerHour: emp[3],
       timeInEvents: [],
       timeOutEvents: []
   }
}


function createEmployeeRecords(emps) {
   return emps.map(emp => createEmployeeRecord(emp));
}


function createTimeInEvent(dateStamp) {
   let [date, hour] = dateStamp.split(" ");
   hour = parseInt(hour);
   this.timeInEvents.push( {
       type: "TimeIn",
       hour: hour,
       date: date
   } );
   return this;
}

function createTimeOutEvent(dateStamp) {
   let [date, hour] = dateStamp.split(" ");
   hour = parseInt(hour);
   this.timeOutEvents.push( {
       type: "TimeOut",
       hour: hour,
       date: date
   } );
   return this;
}


function hoursWorkedOnDate(date) {
   const timeIn = this.timeInEvents.find(event => {
       return event.date === date
   })
   const timeOut = this.timeOutEvents.find(event => {
       return event.date === date
   })
   console.log(timeIn);
   return (timeOut.hour - timeIn.hour)/100;
}


function wagesEarnedOnDate(date) {
   return hoursWorkedOnDate.call(this,date) * this.payPerHour;
}


function calculatePayroll(emps) {
   return emps.reduce( (accumulator, emp ) => {
       return accumulator + allWagesFor.call(emp);
   }, 0)


}


function findEmployeeByFirstName(collection, firstNameString) {
   return collection.find(emp => {
       return emp.firstName === firstNameString;
   })
}

/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!
As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
*/

let allWagesFor = function () {
   let eligibleDates = this.timeInEvents.map(function (e) {
       return e.date
   })

  
   let payable = eligibleDates.reduce( (memo, d) => {
       return memo + wagesEarnedOnDate.call(this, d)
   }, 0) 

   return payable
}