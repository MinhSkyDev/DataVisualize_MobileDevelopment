import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
//import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown'
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

const DropdownComponent = ({data}) => {
  const [value, setValue] = useState(data[0].value);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={{backgroundColor: 'white', padding: 16}}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
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
       
      
    </View>
  );
};

const Chart = () => {
  return (
  <View>
    <Text style={styles.header}>Salary by Position</Text>
    <LineChart
      data={{
        labels: ["PM", "DEV", "QC", "Tech Lead", "PO", "DevOps"],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ],
            color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
          },
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }
        ]
      }}
      width={350} // from react-native
      height={220}
      //yAxisLabel="$"
      yAxisSuffix="$"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "white",
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16
        },
        useShadowColorFromDataset: true,
        /*
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
        */
      }}
     
      /*
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
      */
    />
  </View>
  );
}

const DropDownOption = ({ title = '', data, chart}) => {
  return (
    <View>
      <Text style={styles.header}>{title}</Text>
      <DropdownComponent data={data}/>
      {chart && <Chart />} 
    </View>
  );

}



const App = () => {
  /*
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
  
  const typeChart = [
    { label: 'LineChart',         value: '1' },
    { label: 'BarChart',          value: '2' },
    { label: 'PieChart',          value: '3' },
    { label: 'ProgressChart',     value: '4' },
    { label: 'ContributionGraph', value: '5' },
    { label: 'StackedBarChart',   value: '6' },
  ];

  const xRotation = [
    { label: "Salary",      value: '1' },
    { label: "Don't know",  value: '2' },
    { label: 'Something',   value: '3' },
    { label: 'Anyone?',     value: '4' },
  ]

  const yRotation = [
    { label: "Salary",      value: '1' },
    { label: "Don't know",  value: '2' },
    { label: 'Something',   value: '3' },
    { label: 'Anyone?',     value: '4' },
  ]

  return (
    <ScrollView>
    <View style={styles.container}>
      <DropDownOption title='Dashboard' data={typeChart} chart={true} />
      <DropDownOption title='X-Rotation' data={xRotation} />
      <DropDownOption title='Y-Rotation' data={yRotation} />
    </View>
    </ScrollView>
  );
};



export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'start',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
