import { DataTable } from "@/components/data-table";
import { IAppointment } from "@/models/appointment";
import React from "react";
import { ColumnsDef as AppointmentTableColDef } from "./columnsDef";

const AppointmentTable = ({
  appointments,
}: {
  appointments: IAppointment[];
}) => {
  return <DataTable data={appointments} columns={AppointmentTableColDef} />;
};

export default AppointmentTable;
