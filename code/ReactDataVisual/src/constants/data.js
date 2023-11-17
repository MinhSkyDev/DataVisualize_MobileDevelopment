import { Dimensions } from "react-native";

export const url = "https://human-resource-data-visualize-default-rtdb.asia-southeast1.firebasedatabase.app/.json";

export const xRotation = [
  { label: "Position",           value: 'Position' },
  { label: "Employment Status",  value: 'EmploymentStatus' },
  { label: 'Department',         value: 'Department' },
  { label: 'Recruitment Source', value: 'RecruitmentSource' },
  { label: 'Citizen',            value: 'CitizenDesc' },
  { label: 'Marital',            value: 'MaritalDesc' },
  { label: 'Performance Score',  value: 'PerformanceScore' },
  { label: 'Race',               value: 'RaceDesc' },
  { label: 'Sex',                value: 'Sex' },
  //{ label: 'Absences',           value: 'Absences' },
]

export const yRotation = [
  { label: 'Absences',                    value: 'Absences' },
  { label: "Salary",                      value: 'Salary' },
  { label: "Days Late Last 30",           value: 'DaysLateLast30' },
  { label: 'Special Projects Count',      value: 'SpecialProjectsCount' },
  { label: 'Performance Score',           value: 'PerfScoreID' },
  { label: 'Emsatisfaction',              value: 'Emsatisfaction' },
  { label: 'Engagement Survey',           value: 'EngagementSurvey' },
  /* Doable but hard af
  { label: 'Performance Score - Sum',     value: 'PerformanceScore' },
  { label: 'Citizen',                     value: 'CitizenDesc' },
  { label: 'Marital',                     value: 'MaritalDesc' },
  { label: 'Sex',                         value: 'Sex' },
  { label: 'Department',                  value: 'Department' },
  { label: 'Employment Status',           value: 'EmploymentStatus' },
  */
]

/* report data x depend on y value
export const sumAble = [
  "Absences",
  "Salary",
  "DaysLateLast30",
  "SpecialProjectsCount",
  "PerfScoreID",
]

export const avgAble = [
  "PerfScoreID",
  "Emsatisfaction", 
  "EngagementSurvey",
]
*/

export const typeChart = [
  { label: 'Line Chart', value: 'LineChart' },
  { label: 'Bar Chart',  value: 'BarChart' },
  { label: 'Pie Chart',  value: 'PieChart' },
];

export const screenWidth = Dimensions.get("window").width;
