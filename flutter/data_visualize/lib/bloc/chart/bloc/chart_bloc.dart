import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'chart_event.dart';
part 'chart_state.dart';

class ChartBloc extends Bloc<ChartEvent, ChartState> {
  ChartBloc() : super(ChartInitial()) {
    on<ChartTypeChangeEvent>((event, emit) async {
      await ChartTypeChangeEventHandler(event, emit);
    });
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
    }
  }
}
