import { monthName } from '../constants/data';

export const reportSumData = (data, x, y) => {
  return result = data.reduce((acc, employee) => {
    if (!acc[employee[x]?.toString()]) {
      acc[employee[x]?.toString()] = 0
    }

    acc[employee[x]?.toString()] += employee[y] ;

    return acc
  }, {})
};

export const reportCountData = (data, x) => {
  return result = data.reduce((acc, employee) => {
    if (!acc[employee[x]?.toString()]) {
      acc[employee[x]?.toString()] = 0
    }

    acc[employee[x]?.toString()] += 1 ;

    return acc
  }, {})
};

// function pad to n digits
const padToNDigits = (n, number) => number.toString().padStart(n, '0')

// function convert date format from m/d/y to yyyy-mm-dd
const convertDateFormat = (date) => {
  const [m, d, y] = date.split('/')
  // assume that m, d, y is string, convert to number then convert back to string to get format yyyy-mm-dd
  return `${padToNDigits(4, y)}-${padToNDigits(2, m)}-${padToNDigits(2, d)}`
}


// function to group dates by month
const reportTimeData = (data, x) => {
  // generate list of object { date: '', count: 0 }
  return data.reduce((acc, employee) => {
    const date = convertDateFormat(employee[x])
    if (!acc[date]) {
      acc[date] = 0
    }
    acc[date] += 1
    return acc
  }, {})
}

// function to calculate ages of employees
const calculateAge = (date) => {
  const [m, d, y] = date.split('/')
  const today = new Date()
  const birthDate = new Date(y, m, d)
  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

// data report about range age (10 year) of employees
export const reportAgeData = (data, isSalary = false) => {
  return data.reduce((acc, employee) => {
    const age = calculateAge(employee.DOB)
    const rangeAge = Math.floor(age / 10) * 10
    const label = `${rangeAge}-${rangeAge + 9}`
    if (!acc[label]) {
      acc[label] = 0
    }
    acc[label] += isSalary ? employee.Salary : 1;
    return acc
  }, {})
}
