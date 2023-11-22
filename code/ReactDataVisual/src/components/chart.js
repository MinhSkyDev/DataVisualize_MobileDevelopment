// import libraries, packages
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, Animated } from 'react-native';

// import local files
import { reportCountData, reportSumData, reportAgeData } from '../utils/utils';
import * as Const from '../constants/data';
import { chartConfig } from '../config/config';
import { styles } from '../styles/style';

// import third-party libraries, packages
import { 
  LineChart, 
  BarChart, 
  PieChart 
} from "react-native-chart-kit";
import {
  LineChart as LineChartGifted,
  BarChart as BarChartGifted,
  PieChart as PieChartGifted,
} from "react-native-gifted-charts";
import { Dropdown } from 'react-native-element-dropdown';


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

export const LineChartKitDemo = ({ data = {} }) => {
/*
    // prepare label and datas for linechart
    labels = weartherData.time.map((item) => {
      return item.getHours() + "h" + item.getDate() + '/' + item.getMonth()
    });
    data1 = weartherData.temperature_2m.map((item) => Math.round(item * 100) / 100)
    data2 = weartherData.relativeHumidity2m.map((item) => Math.round(item * 100) / 100)
    data3 = weartherData.dewPoint2m.map((item) => Math.round(item * 100) / 100)
  } else {
    labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    data1 = [20, 45, 28, 80, 99, 43]
    data2 = [30, 29, 10, 50, 77, 51]
    data3 = [10, 20, 30, 40, 50, 60]
  }

*/
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const data1 = [20, 45, 28, 80, 99, 43]
  const data2 = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100))
  const data3 = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100))

  const datapointwidth = 10;
  const dataWidth = datapointwidth * labels.length;
  const chartWidth = Math.max(Const.screenWidth, dataWidth);
 
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
  }, [fadeAnim, labels, data1, data2, data3]);

  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>Weather Forcast last 7 days</Text>
      <ScrollView horizontal={true}>
          <LineChart
            data={{
            labels: labels,
            datasets: [
              {
                data: data1,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              },
              {
                data: data2,
                color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
              },
              {
                data: data3,
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              },
            ]
          }}
            width={chartWidth}
            height={500}
            // show x label only at 00h each day
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForVerticalLabels: {
                //rotation: 15,
                //translateY: 20,
              },
              useShadowColorFromDataset: true,
            }}
            bezier
            style={{marginVertical: 8}}
          />
      </ScrollView>
    </View>
  )
}
export const BarChartKitDemo = ({ data = {}}) => {
  const [xFilter, setXFilter] = useState(Const.barChartFilter[0])
  const [yFilter, setYFilter] = useState(Const.lineChartFilterY[0])

  let labels, values, datafilter;
  // 4 case, normal count, normal sum, DOB count, DOB sum

  if (xFilter.value != 'DOB') {
    if (yFilter.value != 'Count') {
      datafilter = reportSumData(data, xFilter.value, yFilter.value)
    } else {
      datafilter = reportCountData(data, xFilter.value)
    }
  } else {
    if (yFilter.value != 'Count') {
      datafilter = reportAgeData(data, true)
    } else {
      datafilter = reportAgeData(data)
    }
  }


  if (Object.keys(datafilter).length != 0) {
    labels = Object.keys(datafilter).map((item) => item.trim().split(' ').join('\n'))
    
    values = Object.values(datafilter)
  } else {
    // first render, no data
    labels = ["18-25", "25-30", "30-35", "35-40", "40-45", "45-50"]
    values = [20, 45, 28, 80, 99, 43]
  }

  const datapointwidth = 60;
  const dataWidth = datapointwidth * labels.length;
  const chartWidth = Math.max(Const.screenWidth, dataWidth);

  
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
      
      <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>{yFilter.label} by {xFilter.label}</Text>
      <ScrollView horizontal={true}>
      <BarChart
        //style={graphStyle}
        data={{
          labels: labels,
          datasets: [
            {
              data: values,
            },
          ]
        }}
        width={chartWidth}
        height={220}
        fromZero={true}
        chartConfig={chartConfig}
        formatXLabel={(value) => {
          return value.trim().split(' ').join('\n')
        }}
      />
      </ScrollView>
      <FilterComponent title='X-Rotation' data={Const.barChartFilter} onChangeValue={setXFilter} />
      <FilterComponent title='Y-Rotation' data={Const.lineChartFilterY} onChangeValue={setYFilter} />
    </View>
  );
}

export const PieChartKitDemo = ({data = {}}) => {
  const [filter, setFilter] = useState(Const.pieChartFilter[0])

  // prepare data for piechart, care case age data
  const dataFilter = (filter.value != 'DOB')
  ? reportCountData(data, filter.value)
  : reportAgeData(data)

  let datafilter;
  
  // prepare color for each data
  const pieChartColors = [
    '#dc8686',
    '#7ed7c1', 
    '#0766ad', 
    '#f0dbaf',
    '#29adb2',
    '#c5e898',
    '#e377c2',
    '#7071e8',
    '#ffc7c7', 
    '#508d69', 
  ];
  let index = 0;
  // get let color for each data
  const getColor = () => pieChartColors[index++ % pieChartColors.length];

  if (Object.keys(dataFilter).length != 0) {
    // get Object entries then map to array of object
    datafilter = Object.entries(dataFilter).map(([key, value]) => (
      { name: key, 
        score: value, 
        color: getColor(), 
        legendFontColor: "#000000", 
      }
    ))
  } else {
  //prepare case data not loaded yet 
  datafilter = [
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
  }

  //const datapointwidth = 60;
  //const dataWidth = datapointwidth * labels.length;
  //const chartWidth = Math.max(Const.screenWidth, dataWidth);

  
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
  }, [fadeAnim, datafilter]);
  

  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>Terminated Employee by Performance Score</Text>
        <PieChart
          data={datafilter}
          width={Const.screenWidth - 20}
          height={250}
          chartConfig={chartConfig}
          accessor={"score"}
          paddingLeft={'10'}
          backgroundColor={"none"}
        />
      <FilterComponent title='Field' data={Const.pieChartFilter} onChangeValue={setFilter} />
    </View>
  );
}

export const LineChartGiftedDemo = ({ data = {} }) => {

  // generate data for chart with number of quantity and label with each item
  const generateData = (quantity, labels) => 
    Array.from({ length: quantity }, () => Math.floor(Math.random() * 100))
      .map((item, index) => (
        {
          value: item, 
          label: labels[index], 
          //dataPointText: item.toString()
        }
      ));


  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const data1 = generateData(6, labels)
  const data2 = generateData(6, labels)

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>Random Data Example</Text>
      <ScrollView horizontal={true}>
          <LineChartGifted
            thickness={3}
            showVerticalLines
            hideRules
            isAnimated
            color1={'skyblue'}
            dataPointsColor1='blue'
            color2={'lightgreen'}
            dataPointsColor2='green'
            data={data1}
            data2={data2}
          />
      </ScrollView>
    </View>
  )
}

export const BarChartGiftedDemo = ({ data = {}}) => {
  const [xFilter, setXFilter] = useState(Const.barChartFilter[0])
  const [yFilter, setYFilter] = useState(Const.lineChartFilterY[0])

  let labels, values, datafilter;
  // 4 case, normal count, normal sum, DOB count, DOB sum

  if (xFilter.value != 'DOB') {
    if (yFilter.value != 'Count') {
      datafilter = reportSumData(data, xFilter.value, yFilter.value)
    } else {
      datafilter = reportCountData(data, xFilter.value)
    }
  } else {
    if (yFilter.value != 'Count') {
      datafilter = reportAgeData(data, true)
    } else {
      datafilter = reportAgeData(data)
    }
  }


  if (Object.keys(datafilter).length != 0) {
    labels = Object.keys(datafilter)
   
    // map to object value
    values = Object.values(datafilter).map((v, i) =>  (
      {
        value: v, 
        label: labels[i],
        topLabelComponent: () => <Text>{v}</Text>
      }))
  } else {
    // first render, no data
    values = Array.from({ length: 6 }, () => Math.random()*100).map((value) =>  ({value: value}))
  }



  return (
    <View>
      
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>{yFilter.label} by {xFilter.label}</Text>
      <FilterComponent title='X-Rotation' data={Const.barChartFilter} onChangeValue={setXFilter} />
      <FilterComponent title='Y-Rotation' data={Const.lineChartFilterY} onChangeValue={setYFilter} />
      <ScrollView horizontal={true}>
        <BarChartGifted
          marginVertical={10}
          frontColor={'#1640d6'}
          noOfSections={5}
          barWidth={35}
          spacing={20}
          barBorderRadius={4}
          isAnimated
          //yAxisThickness={0}
          //xAxisThickness={0}
          data={values}
        />
      </ScrollView>
    </View>
  );
}

export const PieChartGiftedDemo = ({data = {}}) => {
  const [filter, setFilter] = useState(Const.pieChartFilter[0])

  // prepare data for piechart, care case age data
  const dataFilter = (filter.value != 'DOB')
  ? reportCountData(data, filter.value)
  : reportAgeData(data)

  let datafilter;
  
  // prepare color for each data
  const pieChartColors = [
    '#dc8686',
    '#7ed7c1', 
    '#0766ad', 
    '#f0dbaf',
    '#29adb2',
    '#c5e898',
    '#e377c2',
    '#7071e8',
    '#ffc7c7', 
    '#508d69', 
  ];
  let index = 0;
  // get let color for each data
  const getColor = () => pieChartColors[index++ % pieChartColors.length];

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  if (Object.keys(dataFilter).length != 0) {
    // get Object entries then map to array of object
    datafilter = Object.entries(dataFilter).map(([key, value]) => (
      { text: key, 
        label: key,
        value: value, 
        color: getColor(), 
      }
    ))
  } else {
    //prepare case data not loaded yet 
    datafilter = [
      {
        label: "OnSite",
        value: 60,
        color: "orange",
      },
      {
        label: "Remote",
        value: 30,
        color: "skyblue",
      },
      {
        label: "Hybrid",
        value: 10,
        color: "lightgreen",
      },
    ]
  }

  // get total value of datafilter
  const total = datafilter.reduce((sum, item) => sum + item.value, 0)

  datafilter = datafilter.map((item) => ({...item, text: Math.round(item.value/total * 10000)/100 + '%'}))

  //const datapointwidth = 60;
  //const dataWidth = datapointwidth * labels.length;
  //const chartWidth = Math.max(Const.screenWidth, dataWidth);
  
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
  }, [fadeAnim, datafilter]);
  

  return (
    <View>
      <FilterComponent title='Field' data={Const.pieChartFilter} onChangeValue={setFilter} />
      <PieChartGifted
        textColor={'#000000'}
        showText
        radius={150}
        focusOnPress
        showValuesAsLabels
        data={datafilter}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>  
        {datafilter.map((item) => 
          <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
            {renderDot(item.color)}
            <Text>{item.label}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
