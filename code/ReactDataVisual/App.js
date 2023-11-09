import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
//import { StatusBar } from 'expo-status-bar';
import { fetchWeatherApi } from 'openmeteo';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import 'react-native-url-polyfill/auto'
import 'text-encoding-polyfill'

const params = {
  "latitude": 10.24,
  "longitude": 106.38,
  "hourly": ["temperature_2m", "relative_humidity_2m", "dew_point_2m"],
  "timezone": "Asia/Singapore"
};

const url = "https://api.open-meteo.com/v1/forecast";

const App = () => {
  const [data, setData] = useState([]);

  const getWeatherForecast = async () => {
    try {
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0]
      setData(response);
    } catch (error) {
      console.error(error)
    } 
  }

  useEffect(() => {
    getWeatherForecast();
  }, []);
  

  return (
    <View>
      <Text> Hello </Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

