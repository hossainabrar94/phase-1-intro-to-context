// Your code here
function createEmployeeRecord(array){
    const testEmployee = {
        firstName: `${array[0]}`,
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return testEmployee
}

function createEmployeeRecords(array){
    let employeeRecords = []
    return employeeRecords = array.map(element => createEmployeeRecord(element))
}

function createTimeInEvent(employeeRecord, dateStamp){
    let [date,hour] = dateStamp.split(' ')
    let timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(hour),
        date: `${date}`
    }
    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    let timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let hoursWorked = 0;
    let timeInEvent = employeeRecord.timeInEvents.find(element => element.date === date)
    let timeOutEvent = employeeRecord.timeOutEvents.find(element => element.date === date)
    if(timeInEvent && timeOutEvent){
        hoursWorked = (timeOutEvent.hour - timeInEvent.hour)/100
    }
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date){
    let hoursWorked = hoursWorkedOnDate(employeeRecord,date)
    let wagesEarned = 0
    let timeInEvent = employeeRecord.timeInEvents.find(element => element.date === date)
    if(timeInEvent){
        wagesEarned = employeeRecord.payPerHour * hoursWorked
    }
    return wagesEarned
}

function allWagesFor(employeeRecord){
    let totalWages = 0
    employeeRecord.timeInEvents.forEach(element => {
        let wagesEarnedDate = wagesEarnedOnDate(employeeRecord, element.date)
        totalWages = totalWages + wagesEarnedDate
    })
    return totalWages
}

function calculatePayroll(employeeRecordArrays){
    let totalWagesForAll = 0
    //let employeeRecords = createEmployeeRecords(employeeRecordArrays)
    employeeRecordArrays.forEach(employee => {
        let totalWagesForEmployee = allWagesFor(employee)
        totalWagesForAll = totalWagesForAll + totalWagesForEmployee
    })
    return totalWagesForAll
}