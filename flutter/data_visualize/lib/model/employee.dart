class Employee {
  int? absences;
  String? citizenDesc;
  String? dOB;
  String? dateofHire;
  String? dateofTermination;
  int? daysLateLast30;
  String? department;
  int? deptID;
  int? empID;
  int? empSatisfaction;
  int? empStatusID;
  String? employeeName;
  String? employmentStatus;
  double? engagementSurvey;
  int? fromDiversityJobFairID;
  int? genderID;
  String? hispanicLatino;
  String? lastPerformanceReviewDate;
  int? managerID;
  String? managerName;
  String? maritalDesc;
  int? maritalStatusID;
  int? marriedID;
  int? perfScoreID;
  String? performanceScore;
  String? position;
  int? positionID;
  String? raceDesc;
  String? recruitmentSource;
  int? salary;
  String? sex;
  int? specialProjectsCount;
  String? state;
  String? termReason;
  int? termd;
  int? zip;

  Employee(
      {this.absences,
      this.citizenDesc,
      this.dOB,
      this.dateofHire,
      this.dateofTermination,
      this.daysLateLast30,
      this.department,
      this.deptID,
      this.empID,
      this.empSatisfaction,
      this.empStatusID,
      this.employeeName,
      this.employmentStatus,
      this.engagementSurvey,
      this.fromDiversityJobFairID,
      this.genderID,
      this.hispanicLatino,
      this.lastPerformanceReviewDate,
      this.managerID,
      this.managerName,
      this.maritalDesc,
      this.maritalStatusID,
      this.marriedID,
      this.perfScoreID,
      this.performanceScore,
      this.position,
      this.positionID,
      this.raceDesc,
      this.recruitmentSource,
      this.salary,
      this.sex,
      this.specialProjectsCount,
      this.state,
      this.termReason,
      this.termd,
      this.zip});

  Employee.fromJson(Map<String, dynamic> json) {
    absences = json['Absences'];
    citizenDesc = json['CitizenDesc'];
    dOB = json['DOB'];
    dateofHire = json['DateofHire'];
    dateofTermination = json['DateofTermination'];
    daysLateLast30 = json['DaysLateLast30'];
    department = json['Department'];
    deptID = json['DeptID'];
    empID = json['EmpID'];
    empSatisfaction = json['EmpSatisfaction'];
    empStatusID = json['EmpStatusID'];
    employeeName = json['Employee_Name'];
    employmentStatus = json['EmploymentStatus'];
    engagementSurvey = double.tryParse(json['EngagementSurvey'].toString());
    fromDiversityJobFairID = json['FromDiversityJobFairID'];
    genderID = json['GenderID'];
    hispanicLatino = json['HispanicLatino'];
    lastPerformanceReviewDate = json['LastPerformanceReview_Date'];
    managerID = json['ManagerID'];
    managerName = json['ManagerName'];
    maritalDesc = json['MaritalDesc'];
    maritalStatusID = json['MaritalStatusID'];
    marriedID = json['MarriedID'];
    perfScoreID = json['PerfScoreID'];
    performanceScore = json['PerformanceScore'];
    position = json['Position'];
    positionID = json['PositionID'];
    raceDesc = json['RaceDesc'];
    recruitmentSource = json['RecruitmentSource'];
    salary = json['Salary'];
    sex = json['Sex'];
    specialProjectsCount = json['SpecialProjectsCount'];
    state = json['State'];
    termReason = json['TermReason'];
    termd = json['Termd'];
    zip = json['Zip'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['Absences'] = this.absences;
    data['CitizenDesc'] = this.citizenDesc;
    data['DOB'] = this.dOB;
    data['DateofHire'] = this.dateofHire;
    data['DateofTermination'] = this.dateofTermination;
    data['DaysLateLast30'] = this.daysLateLast30;
    data['Department'] = this.department;
    data['DeptID'] = this.deptID;
    data['EmpID'] = this.empID;
    data['EmpSatisfaction'] = this.empSatisfaction;
    data['EmpStatusID'] = this.empStatusID;
    data['Employee_Name'] = this.employeeName;
    data['EmploymentStatus'] = this.employmentStatus;
    data['EngagementSurvey'] = this.engagementSurvey;
    data['FromDiversityJobFairID'] = this.fromDiversityJobFairID;
    data['GenderID'] = this.genderID;
    data['HispanicLatino'] = this.hispanicLatino;
    data['LastPerformanceReview_Date'] = this.lastPerformanceReviewDate;
    data['ManagerID'] = this.managerID;
    data['ManagerName'] = this.managerName;
    data['MaritalDesc'] = this.maritalDesc;
    data['MaritalStatusID'] = this.maritalStatusID;
    data['MarriedID'] = this.marriedID;
    data['PerfScoreID'] = this.perfScoreID;
    data['PerformanceScore'] = this.performanceScore;
    data['Position'] = this.position;
    data['PositionID'] = this.positionID;
    data['RaceDesc'] = this.raceDesc;
    data['RecruitmentSource'] = this.recruitmentSource;
    data['Salary'] = this.salary;
    data['Sex'] = this.sex;
    data['SpecialProjectsCount'] = this.specialProjectsCount;
    data['State'] = this.state;
    data['TermReason'] = this.termReason;
    data['Termd'] = this.termd;
    data['Zip'] = this.zip;
    return data;
  }
}
