export const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0,
  backgroundColor: "white",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  fillShadowGradient: '#508d69',
  fillShadowGradientOpacity: 1,
  propsForVerticalLabels: {
    rotation: 15,
  },
};
