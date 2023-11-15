export const reportData = (data, x, y) => {
  return result = data.reduce((acc, employee) => {
    if (!acc[employee[x]?.toString()]) {
      acc[employee[x]?.toString()] = 0
    }

    acc[employee[x]?.toString()] += employee[y] ;

    return acc
  }, {})
}
