export interface IAssignment {
  id?: string;
  effectiveStartDate: Date;
  effectiveEndDate: Date;
  assignmentType: string;
  driverId?: string;
  vehicleId?: string;
}

export interface IAssignmentQuery {
  driverId: string;
  vehicleId: string;
  assignmentType: string;
}
