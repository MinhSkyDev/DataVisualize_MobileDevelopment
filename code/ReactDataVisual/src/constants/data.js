import { Dimensions } from "react-native";

export const humanResourceURL = "https://human-resource-data-visualize-default-rtdb.asia-southeast1.firebasedatabase.app/.json";

export const weatherForcastURL = "https://api.open-meteo.com/v1/forecast";

// Ho Chi Minh City
export const params = {
  "latitude": 10.823,
  "longitude": 106.6296,
  "hourly": ["temperature_2m", "relative_humidity_2m", "dew_point_2m"],
  "timezone": "Asia/Singapore",
};

export const lineChartFilterX = [
  { label: 'Position', value: 'Position' }
]
export const lineChartFilterY = [
  { label: 'Salary', value: 'Salary' },
  { label: 'Count',  value: 'Count' },
]

export const barChartFilter = [
  { label: 'Citizen',            value: 'CitizenDesc' },
  { label: 'Race',               value: 'RaceDesc' },
  { label: 'Department',         value: 'Department' },
  { label: 'Employment Status',  value: 'EmploymentStatus' },
  { label: 'Performance Score',  value: 'PerformanceScore' },
  { label: 'Recruitment Source', value: 'RecruitmentSource' },
  // can handle but hard af
  { label: 'Date of Birth',      value: 'DOB' },
]

export const pieChartFilter = [
  { label: 'Sex',                value: 'Sex' },
  { label: 'Citizen',            value: 'CitizenDesc' },
  { label: 'Marital',            value: 'MaritalDesc' },
  { label: 'Race',               value: 'RaceDesc' },
  { label: 'Department',         value: 'Department' },
  { label: 'Employment Status',  value: 'EmploymentStatus' },
  { label: 'Performance Score',  value: 'PerformanceScore' },
  { label: 'Recruitment Source', value: 'RecruitmentSource' },
  // can handle but hard af
  { label: 'Date of Birth',      value: 'DOB' },
]

export const ContributionChartFilter = [
  { label: 'Date of Hire', value: 'DateofHire' },
  { label: 'Date of Termination', value: 'DateofTermination' },
]

export const typeChart = [
  { label: 'Line Chart - chartkit', value: 'LineChart-kit' },
  { label: 'Bar Chart - chartkit',  value: 'BarChart-kit' },
  { label: 'Pie Chart - chartkit',  value: 'PieChart-kit' },
  { label: 'Line Chart - giftedcharts', value: 'LineChart-gifted' },
  { label: 'Bar Chart - giftedcharts',  value: 'BarChart-gifted' },
  { label: 'Pie Chart - giftedcharts',  value: 'PieChart-gifted' },
];

export const screenWidth = Dimensions.get("window").width;

// Const Array name of Month
export const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec']



// form time ranges
/*
const range = (start, stop, step) => 
  Array.from({length: (stop - start) / step }, (_, i) => start + (i * step));

export const weatherData = {
  hourly: {
    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map((t) => new Date((t + response.utcOffsetSeconds() * 1000))),
    temperature_2m:     hourly.variable(0).valuesAsArray(),
    relativeHumidity2m: hourly.variable(1).valuesAsArray(),
    dewPoint2m:         hourly.variable(2).valuesAsArray(),
  }
}
*/
