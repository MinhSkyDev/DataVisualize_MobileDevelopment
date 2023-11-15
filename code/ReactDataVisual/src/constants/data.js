import { Dimensions } from "react-native";

export const url = "https://human-resource-data-visualize-default-rtdb.asia-southeast1.firebasedatabase.app/.json";

export const xRotation = [
  { label: "Position",           value: 'Position' },
  { label: "Employment Status",  value: 'EmploymentStatus' },
  { label: 'Department',         value: 'Department' },
  { label: 'Recruitment Source', value: 'RecruitmentSource' },
]

export const yRotation = [
  { label: "Salary",                 value: 'Salary' },
  { label: "Days Late Last 30",      value: 'DaysLateLast30' },
  { label: 'Special Projects Count', value: 'SpecialProjectsCount' },
  { label: 'Absences',               value: 'Absences' },
]

export const typeChart = [
  { label: 'Line Chart', value: 'LineChart' },
  { label: 'Bar Chart',  value: 'BarChart' },
  { label: 'Pie Chart',  value: 'PieChart' },
];

export const screenWidth = Dimensions.get("window").width;
