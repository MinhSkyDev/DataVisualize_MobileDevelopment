import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:data_visualize/ultility/chartDataRead.dart';
import 'package:meta/meta.dart';

part 'chart_event.dart';
part 'chart_state.dart';

class ChartBloc extends Bloc<ChartEvent, ChartState> {
  ChartBloc() : super(ChartInitial()) {
    on<ChartInitEvent>((event, emit) async {
      await ChartInitEventHandler(event, emit);
    });

    on<ChartTypeChangeEvent>((event, emit) async {
      await ChartTypeChangeEventHandler(event, emit);
    });
  }

  FutureOr<void> ChartInitEventHandler(event, emit) {
    DataProccessor dataProccessor = DataProccessor();
    dataProccessor.getData();
    emit(ChartLineDisplay());
  }

  FutureOr<void> ChartTypeChangeEventHandler(event, emit) {
    emit(ChartChangeData());
    ChartTypeChangeEvent chartTypeChangeEvent = event as ChartTypeChangeEvent;

    if (chartTypeChangeEvent.currentType == "Line") {
      emit(ChartLineDisplay());
    } else if (chartTypeChangeEvent.currentType == "Column") {
      emit(ChartBarDisplay());
    } else if (chartTypeChangeEvent.currentType == "Pie") {
      emit(ChartPieDisplay());
    } else if (chartTypeChangeEvent.currentType == "Area") {
      emit(ChartAreaDisplay());
    } else if (chartTypeChangeEvent.currentType == "Candle") {
      emit(ChartCandleDisplay());
    } else if (chartTypeChangeEvent.currentType == "Doughnut") {
      emit(ChartDoughnutDisplay());
    } else if (chartTypeChangeEvent.currentType == "Radial") {
      emit(ChartRadialDisplay());
    }
  }
}
