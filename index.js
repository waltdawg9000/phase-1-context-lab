/* Your Code Here */

// This is creating the record that can later be used as execution context
// Accepts an array with employee info ['first', 'last', 'title', 'payRate']
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

// Batch create; accepts an array of arrays
function createEmployeeRecords(emps) {
   return emps.map(emp => createEmployeeRecord(emp));
}

// This is the first method that interacts with an existing employee record
// It is called with an `employee` object as context (using `call` or `apply`)
// ==> the person object = this
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

// Calculates hours worked on a specific date for a specific `employee` object 
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

// Here we're using `.call` to call `hoursWorkedOnDate` for the `employee` object
// that is the context set when this function was called
function wagesEarnedOnDate(date) {
   return hoursWorkedOnDate.call(this,date) * this.payPerHour;
}

// This takes an array of employee records (e.g., created by createEmployeeRecords)
// then calls `allWagesFor` for each employee record and accumulates into a total
function calculatePayroll(emps) {
   // With separate callback
   // const reducer = (accumulator, emp) => accumulator + allWagesFor.call(emp);
   // return emps.reduce(reducer, 0);

   // With arrow function
   return emps.reduce( (accumulator, emp ) => {
       return accumulator + allWagesFor.call(emp);
   }, 0)

   // with conventional function
   // return emps.reduce(function(accumulator, emp ) {
   //     return accumulator + allWagesFor.call(emp);
   // }, 0)
}

// This takes an array of employee records (e.g., created by createEmployeeRecords)
// and returns the employee with the specified first name
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

   // Code provided in the lab:
   // let payable = eligibleDates.reduce(function (memo, d) {
   //     return memo + wagesEarnedOnDate.call(this, d)
   // }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

   // Can accomplish the same thing by switch to arrow syntax
   let payable = eligibleDates.reduce( (memo, d) => {
       return memo + wagesEarnedOnDate.call(this, d)
   }, 0) 

   return payable
}
