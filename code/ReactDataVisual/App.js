// import libraries, packages
import React, { useRef, useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';

// import local files
import { styles } from './src/styles/style';
import * as Const from './src/constants/data';
import * as Chart from './src/components/chart';

// import third-party libraries, packages
import { Dropdown } from 'react-native-element-dropdown'

//    import for openmeteo
import { fetchWeatherApi } from 'openmeteo';
import 'react-native-url-polyfill/auto'
import 'text-encoding-polyfill';

const renderChart = (nameChart) => {
  // for human resource data
  const [hrData, setHrData] = useState([])
  // for weather forecast data
  const [weatherData, setWeatherData] = useState(null)

  const getHRData = async () => {
    try {
      const response = await fetch(Const.humanResourceURL);
      const json = await response.json();
      setHrData(json)
    } catch (err) {
      console.error(err)
    }
  }

  const getWeatherForecast = async () => {
    try {
      const responses = await fetchWeatherApi(Const.weatherForcastURL, Const.params);
      return responses
    } catch (error) {
      console.error(error)
    } 
  }

  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + (i * step));

  useEffect(() => {
    getHRData();
    getWeatherForecast()
      .then((response) => {
        console.log('weather forecast')
        const data = response[0];
        const hourly = data.hourly();
        // reduce from every 1 hours from 1 week to every 4 hours a day
        const weatherdata = {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map((t) => new Date((t + data.utcOffsetSeconds()) * 1000)).filter((_, i) => (i+1) % 6 == 0 ),
            temperature_2m:     hourly.variables(0).valuesArray().filter((_, i) => (i+1) % 6 == 0 ),
            relativeHumidity2m: hourly.variables(1).valuesArray().filter((_, i) => (i+1) % 6 == 0 ),
            dewPoint2m:         hourly.variables(2).valuesArray().filter((_, i) => (i+1) % 6 == 0 ),
        }
            setWeatherData(weatherdata)
      })
      .catch((err) => {
        console.error(err)
      });
  }, [])

  switch (nameChart) {
    case 'LineChart-kit':
      return <Chart.LineChartKitDemo data={weatherData} />
    case 'BarChart-kit':
      return <Chart.BarChartKitDemo data={hrData}/>
    case 'PieChart-kit':
      return <Chart.PieChartKitDemo data={hrData}/>
    case 'LineChart-victory':
      return <Chart.LineChartVictoryDemo  />
    case 'BarChart-victory':
      return <Chart.BarChartVictoryDemo data={hrData}/>
    case 'PieChart-victory':
      return <Chart.PieChartVictoryDemo data={hrData}/>
    case 'LineChart-gifted':
      return <Chart.LineChartGiftedDemo data={weatherData} />
    case 'BarChart-gifted':
      return <Chart.BarChartGiftedDemo data={hrData}/>
    case 'PieChart-gifted':
      return <Chart.PieChartGiftedDemo data={hrData}/>
    default:
      return;
  }
}

const DropdownComponent = () => {
  const [value, setValue] = useState(Const.typeChart[0].value);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={{ backgroundColor: 'white' }}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={Const.typeChart}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
      {renderChart(value)}
    </View>
  );
};

const DropDownChart = ({ title = ''}) => {
  return (
    <View>
      <Text style={styles.header}>{title}</Text>
      <DropdownComponent />
    </View>
  );

}

const App = () => {
  /* for weather forecast
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
  */

  return (
    <ScrollView>
      <View style={styles.container}>
        <DropDownChart title='Dashboard'/>
      </View>
    </ScrollView>
  );
};



export default App;

