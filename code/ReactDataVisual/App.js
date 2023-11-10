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
import { Dimensions } from 'react-native';
import 'react-native-url-polyfill/auto'
import 'text-encoding-polyfill'

const params = {
  "latitude": 10.24,
  "longitude": 106.38,
  "hourly": ["temperature_2m", "relative_humidity_2m", "dew_point_2m"],
  "timezone": "Asia/Singapore"
};

const url = "https://api.open-meteo.com/v1/forecast";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0,
  backgroundColor: "white",
  color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  fillShadowGradient: '#228b22', 
  fillShadowGradientOpacity: 1
};

const LineChartDemo = () => {
  return (
  <View>
    <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>Salary by Position</Text>
    <LineChart
      data={{
        labels: ["PM", "DEV", "QC", "Tech Lead", "PO", "DevOps"],
        datasets: [
          {
            data: Array.from({length: 6}, () => Math.random() * 100),
            color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
          },
          {
            data: Array.from({length: 6}, () => Math.random() * 100),
            color: (opacity = 1) => `rgba(0, 0, 240, ${opacity})`,
          }
        ]
      }}
      width={screenWidth}
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
      }}
     
    />
  </View>
  );
}

const BarChartDemo = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: Array.from({length: 6}, () => Math.round(Math.random() * 100)),
        color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
      },
      {
        data: Array.from({length: 6}, () => Math.round(Math.random() * 100)),
        color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
      },

    ]
  };

  return (
    <View>
      <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>Active Employees by Age</Text>
      <BarChart
        //style={graphStyle}
        data={data}
        width={screenWidth}
        height={220}
        fromZero={true}
        chartConfig={chartConfig}
      />
    </View>
  );
}

const PieChartDemo = () => {

  const data = [
    {
      name: "OnSite",
      score: 60,
      color: "orange",
      legendFontColor: "#000000",
    },
    {
      name: "Remote",
      score: 30,
      color: "skyblue",
      legendFontColor: "#000000",
    },
    {
      name: "Hybrid",
      score: 10,
      color: "lightgreen",
      legendFontColor: "#000000",
    },
  ]

  return (
    <View>
      <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>Terminated Employee by Performance Score</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={320}
        chartConfig={chartConfig}
        accessor={"score"}
        paddingLeft={'35'}
        backgroundColor={"none"}

      />
    </View>
  );
}

const ProgressChartDemo = () => {
  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };


  return (
    <View>
      <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>Demo chart</Text>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  );
}

const ContributionGraphDemo = () => {
  return (
    <View />
  );
}

const StackedBarChartDemo = () => {
  return (
    <View />
  );
}

const renderChart = (nameChart) => {
  switch (nameChart) {
    case 'LineChart':
      return <LineChartDemo />
    case 'BarChart':
      return <BarChartDemo />
    case 'PieChart':
      return <PieChartDemo />
    case 'ProgressChart':
      return <ProgressChartDemo />
    case 'ContributionGraph':
      return <ContributionGraphDemo />
    case 'StackedBarChart':
      return <StackedBarChartDemo />
    default:
      return;
  }
}

const DropdownComponent = ({data, visualdata}) => {
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
    <View style={{backgroundColor: 'white'}}>
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
      { visualdata && renderChart(data[value].label)}
    </View>
  );
};

const DropDownOption = ({ title = '', data, chart}) => {
  return (
    <View>
      <Text style={styles.header}>{title}</Text>
      <DropdownComponent data={data} visualdata={chart}/>
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
    { label: 'LineChart',         value: '0' },
    { label: 'BarChart',          value: '1' },
    { label: 'PieChart',          value: '2' },
    { label: 'ProgressChart',     value: '3' },
    { label: 'ContributionGraph', value: '4' },
    { label: 'StackedBarChart',   value: '5' },
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
      <Text style={styles.header}> Colour Customization </Text>
    </View>
    </ScrollView>
  );
};



export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'start',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 16,
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
