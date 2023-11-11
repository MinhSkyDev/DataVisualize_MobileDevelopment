import 'package:data_visualize/bloc/chart/bloc/chart_bloc.dart';
import 'package:data_visualize/ui/data_visualize.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: BlocProvider(
      create: (context) => ChartBloc(),
      child: DataVisualizeScreen(),
    ));
  }
}
