import 'package:data_visualize/bloc/chart/bloc/chart_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class DataVisualizeScreen extends StatefulWidget {
  const DataVisualizeScreen({super.key});

  @override
  State<DataVisualizeScreen> createState() => _DataVisualizeScreenState();
}

class _DataVisualizeScreenState extends State<DataVisualizeScreen> {
  List<String> temporaryBartypeDropdown = ["Line", "Column", "Pie"];
  List<String> temporaryXAsisData = [
    "Employee_Name",
    "EmpID",
    "MarriedID",
    "MaritalStatusID",
    "GenderID",
    "EmpStatusID",
    "DeptID",
    "PerfScoreID",
    "FromDiversityJobFairID",
    "Salary",
    "Termd",
    "PositionID",
    "Position",
    "State",
    "Zip",
    "DOB",
    "Sex",
    "MaritalDesc",
    "CitizenDesc",
    "HispanicLatino",
    "RaceDesc",
    "DateofHire",
    "DateofTermination",
    "TermReason",
    "EmploymentStatus",
    "Department",
    "ManagerName",
    "ManagerID",
    "RecruitmentSource",
    "PerformanceScore",
    "EngagementSurvey",
    "EmpSatisfaction",
    "SpecialProjectsCount",
    "LastPerformanceReview_Date",
    "DaysLateLast30",
    "Absences"
  ];

  List<String> temporaryYAsisData = [
    "Employee_Name",
    "EmpID",
    "MarriedID",
    "MaritalStatusID",
    "GenderID",
    "EmpStatusID",
    "DeptID",
    "PerfScoreID",
    "FromDiversityJobFairID",
    "Salary",
    "Termd",
    "PositionID",
    "Position",
    "State",
    "Zip",
    "DOB",
    "Sex",
    "MaritalDesc",
    "CitizenDesc",
    "HispanicLatino",
    "RaceDesc",
    "DateofHire",
    "DateofTermination",
    "TermReason",
    "EmploymentStatus",
    "Department",
    "ManagerName",
    "ManagerID",
    "RecruitmentSource",
    "PerformanceScore",
    "EngagementSurvey",
    "EmpSatisfaction",
    "SpecialProjectsCount",
    "LastPerformanceReview_Date",
    "DaysLateLast30",
    "Absences"
  ];

  @override
  Widget build(BuildContext context) {
    ChartBloc chartBloc = BlocProvider.of<ChartBloc>(context);

    @override
    void initState() {
      chartBloc.add(ChartInitEvent());
    }

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: SingleChildScrollView(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text("Dashboard"),
                  const SizedBox(
                    height: 10,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  DropdownMenu(
                    initialSelection: temporaryBartypeDropdown.first,
                    dropdownMenuEntries: temporaryBartypeDropdown
                        .map<DropdownMenuEntry<String>>((String value) {
                      return DropdownMenuEntry<String>(
                          value: value, label: value);
                    }).toList(),
                    onSelected: (val) {
                      chartBloc.add(ChartTypeChangeEvent(val as String));
                    },
                  ),
                  const Text("Salary by Position"),
                  SizedBox(
                    height: 350,
                    width: 400,
                    child: BlocBuilder(
                      bloc: chartBloc,
                      builder: (context, state) {
                        if (state is ChartPieDisplay) {
                          return PieChart();
                        } else if (state is ChartLineDisplay) {
                          return LineChart();
                        } else if (state is ChartBarDisplay) {
                          return ColumnChart();
                        } else {
                          return Placeholder();
                        }
                      },
                    ),
                  ),
                  const Text("X-Rotation"),
                  const SizedBox(
                    height: 10,
                  ),
                  DropdownMenu(
                    initialSelection: temporaryXAsisData.first,
                    dropdownMenuEntries: temporaryXAsisData
                        .map<DropdownMenuEntry<String>>((String value) {
                      return DropdownMenuEntry<String>(
                          value: value, label: value);
                    }).toList(),
                  ),
                  const SizedBox(height: 10),
                  const Text("Y-Rotation"),
                  const SizedBox(
                    height: 10,
                  ),
                  DropdownMenu(
                    initialSelection: temporaryYAsisData.first,
                    dropdownMenuEntries: temporaryYAsisData
                        .map<DropdownMenuEntry<String>>((String value) {
                      return DropdownMenuEntry<String>(
                          value: value, label: value);
                    }).toList(),
                  ),
                ]),
          ),
        ),
      ),
    );
  }
}

Widget ColumnChart() {
  return SfCartesianChart(
    primaryXAxis: CategoryAxis(),
    series: <ChartSeries<SalesData, String>>[
      ColumnSeries(
        dataSource: <SalesData>[
          SalesData('Jan', 35),
          SalesData('Feb', 28),
          SalesData('Mar', 34),
          SalesData('Apr', 32),
          SalesData('May', 40)
        ],
        xValueMapper: (SalesData sales, _) => sales.year,
        yValueMapper: (SalesData sales, _) => sales.sales,
      )
    ],
  );
}

Widget PieChart() {
  return SfCircularChart(
    series: <PieSeries<SalesData, String>>[
      PieSeries(
        dataSource: <SalesData>[
          SalesData('Jan', 35),
          SalesData('Feb', 28),
          SalesData('Mar', 34),
          SalesData('Apr', 32),
          SalesData('May', 40)
        ],
        xValueMapper: (SalesData sales, _) => sales.year,
        yValueMapper: (SalesData sales, _) => sales.sales,
      ),
    ],
  );
}

Widget LineChart() {
  return SfCartesianChart(
      primaryXAxis: CategoryAxis(),
      series: <LineSeries<SalesData, String>>[
        LineSeries<SalesData, String>(
            // Bind data source
            dataSource: <SalesData>[
              SalesData('Jan', 35),
              SalesData('Feb', 28),
              SalesData('Mar', 34),
              SalesData('Apr', 32),
              SalesData('May', 40)
            ],
            xValueMapper: (SalesData sales, _) => sales.year,
            yValueMapper: (SalesData sales, _) => sales.sales)
      ]);
}

class SalesData {
  SalesData(this.year, this.sales);
  final String year;
  final double sales;
}
