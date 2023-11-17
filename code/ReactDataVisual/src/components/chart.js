// import libraries, packages
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, Animated } from 'react-native';

// import local files
import { reportData } from '../utils/index';
import * as Const from '../constants/data';
import { chartConfig } from '../config/chart';
import { styles } from '../styles/style';

// import third-party libraries, packages
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { Dropdown } from 'react-native-element-dropdown'

const FilterComponent = ({ title, data, onChangeValue }) => {
  const [value, setValue] = useState(data[0].value);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={{ backgroundColor: 'white' }}>
      <Text style={styles.header}>{title}</Text>
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
          onChangeValue(item)
        }}
      />
    </View>
  );
}

export const LineChartDemo = ({ data = {} }) => {
  const [xFilter, setXFilter] = useState(Const.xRotation[0])
  const [yFilter, setYFilter] = useState(Const.yRotation[0])

  const datafilter = reportData(data, xFilter.value, yFilter.value)
  let labels, values;

  if (Object.keys(datafilter).length != 0) {
    labels = Object.keys(datafilter).map((item) => item.split(' ').join('\n'))
    console.log(labels)
    values = Object.values(datafilter)
  } else {
    // first render, no data
    labels = ["pm", "dev", "qc", "tech lead", "po", "devops"]
    values = Array.from({ length: 6 }, () => 0)
  }

  const datapointwidth = 60;
  const chartWidth = datapointwidth * labels.length;

  const fadeAnim = useRef(new Animated.Value(0)).current; // initial value for opacity: 0

  useEffect(() => {
    fadeAnim.setValue(0); // reset the animation value to 0
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim, labels, values]);
  // <FilterComponent title='Type' data={typeChart} onChangeValue={setTypeFilter} />

  return (
    <View>
      <FilterComponent title='X-Rotation' data={Const.xRotation} onChangeValue={setXFilter} />
      <FilterComponent title='Y-Rotation' data={Const.yRotation} onChangeValue={setYFilter} />
      
      <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>{yFilter.label} by {xFilter.label}</Text>
      <ScrollView horizontal={true}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: values,
                  color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
                },
                // TODO extend: filter xRotation choose multiple type
              ]
            }}
            width={chartWidth}
            height={500}
            //yAxisLabel="$"
            //yAxisSuffix="$"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForVerticalLabels: {
                rotation: -15,
                translateY: 20,
              },
              useShadowColorFromDataset: true,
            }}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

export const BarChartDemo = ({ data = {}}) => {
  const [xFilter, setXFilter] = useState(Const.xRotation[0])
  const [yFilter, setYFilter] = useState(Const.yRotation[0])

  const datafilter = reportData(data, xFilter.value, yFilter.value)
  let labels, values;

  if (Object.keys(datafilter).length != 0) {
    labels = Object.keys(datafilter).map((item) => item.split(' ').join('\n'))
    console.log(labels)
    values = Object.values(datafilter)
  } else {
    // first render, no data
    labels = ["18-25", "25-30", "30-35", "35-40", "40-45", "45-50"]
    values = [20, 45, 28, 80, 99, 43]
  }

  const datapointwidth = 60;
  const chartWidth = datapointwidth * labels.length;
  
  const fadeAnim = useRef(new Animated.Value(0)).current; // initial value for opacity: 0

  useEffect(() => {
    fadeAnim.setValue(0); // reset the animation value to 0
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim, labels, values]);

  return (
    <View>
      <FilterComponent title='X-Rotation' data={Const.xRotation} onChangeValue={setXFilter} />
      <FilterComponent title='Y-Rotation' data={Const.yRotation} onChangeValue={setYFilter} />
      
      <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>{yFilter.label} by {xFilter.label}</Text>
      <ScrollView horizontal={true}>
      <BarChart
        //style={graphStyle}
        data={{
          labels: labels,
          datasets: [
            {
              data: values,
              color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
            },
          ]
        }}
        width={chartWidth}
        height={220}
        fromZero={true}
        chartConfig={chartConfig}
      />
      </ScrollView>
    </View>
  );
}

export const PieChartDemo = () => {

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
      <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>Terminated Employee by Performance Score</Text>
      <PieChart
        data={data}
        width={Const.screenWidth}
        height={320}
        chartConfig={chartConfig}
        accessor={"score"}
        paddingLeft={'35'}
        backgroundColor={"none"}

      />
    </View>
  );
}


