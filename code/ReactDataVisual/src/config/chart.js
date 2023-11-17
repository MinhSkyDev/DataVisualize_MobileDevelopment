export const chartConfig = {
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
  fillShadowGradientOpacity: 1,
  propsForVerticalLabels: {
    rotation: -15,
  },
};
