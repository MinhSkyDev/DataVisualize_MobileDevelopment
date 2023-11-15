// import libraries, packages
import React, { useRef, useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';

// import local files
import { styles } from './src/styles/style';
import * as Const from './src/constants/data';
import * as Chart from './src/components/chart';

// import third-party libraries, packages
import { Dropdown } from 'react-native-element-dropdown'


/*    import for openmeteo

  import { fetchWeatherApi } from 'openmeteo';
  import 'react-native-url-polyfill/auto'
  import 'text-encoding-polyfill'
  const params = {
    "latitude": 10.24,
    "longitude": 106.38,
    "hourly": ["temperature_2m", "relative_humidity_2m", "dew_point_2m"],
    "timezone": "Asia/Singapore"
  };
  const url = "https://api.open-meteo.com/v1/forecast";

*/
const renderChart = (nameChart) => {
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const response = await fetch(Const.url);
      const json = await response.json();
      setData(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  switch (nameChart) {
    case 'LineChart':
      return <Chart.LineChartDemo data={data} />
    case 'BarChart':
      return <Chart.BarChartDemo />
    case 'PieChart':
      return <Chart.PieChartDemo />
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
          onChangeValue(item.label)
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
        <Text style={styles.header}> Colour Customization </Text>
      </View>
    </ScrollView>
  );
};



export default App;

