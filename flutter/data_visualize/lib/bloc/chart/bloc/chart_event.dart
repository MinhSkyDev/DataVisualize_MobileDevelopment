part of 'chart_bloc.dart';

abstract class ChartEvent {}

class ChartInitEvent extends ChartEvent {}

class XRotationChangeEvent extends ChartEvent {}

class YRotationChangeEvent extends ChartEvent {}

class ChartTypeChangeEvent extends ChartEvent {
  String currentType;
  ChartTypeChangeEvent(this.currentType);
}

class ChartColourChangeEvent extends ChartEvent {}
