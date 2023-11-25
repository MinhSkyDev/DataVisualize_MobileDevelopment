part of 'chart_bloc.dart';

@immutable
abstract class ChartState {}

class ChartInitial extends ChartState {}

class ChartChangeData extends ChartState {}

class ChartLineDisplay extends ChartState {}

class ChartBarDisplay extends ChartState {}

class ChartPieDisplay extends ChartState {}

class ChartAreaDisplay extends ChartState {}

class ChartCandleDisplay extends ChartState {}

class ChartDoughnutDisplay extends ChartState {}

class ChartRadialDisplay extends ChartState {}
