import 'dart:convert';
import 'dart:io';

import 'package:data_visualize/model/employee.dart';
import 'package:http/http.dart' as http;

class DataProccessor {
  List<Employee> employees = [];
  String URL =
      "https://human-resource-data-visualize-default-rtdb.asia-southeast1.firebasedatabase.app/.json";
  DataProccessor();

  void getData() async {
    final response = await http.get(Uri.parse(URL));
    if (response.statusCode == 200) {
      employees = (json.decode(response.body) as List)
          .map((i) => Employee.fromJson(i))
          .toList();
    }

    print(employees[2].toJson().toString());
  }
}
