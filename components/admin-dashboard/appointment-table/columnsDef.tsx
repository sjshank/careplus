"use client";

import { Doctors } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import { IAppointment } from "@/models/appointment";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { CancelAppointmentModal, ScheduleAppointmentModal } from "./modal";

const ColumnHeader = (title: string) => (
  <div className="shad-table-row-header text-16-semibold">{title}</div>
);

export const ColumnsDef: ColumnDef<Partial<IAppointment>>[] = [
  {
    id: "patient",
    accessorKey: "patient.name",
    header: () => ColumnHeader("Patient"),
  },
  {
    accessorKey: "schedule",
    header: () => ColumnHeader("Date"),
    cell: ({ row }) => {
      const formattedDate = formatDateTime(row.getValue("schedule")).dateOnly;
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "status",
    header: () => ColumnHeader("Status"),
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge
          className={clsx("status-badge", {
            "bg-green-600 text-green-300": status === "scheduled",
            "bg-blue-600 text-blue-300": status === "pending",
            "bg-red-600 text-red-300": status === "cancelled",
          })}>
          <p className="text-16-semibold capitalize">{status}</p>
        </Badge>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: () => ColumnHeader("Doctor"),
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.getValue("primaryPhysician")
      );
      return (
        <div className="flex items-center gap-2">
          {doctor && (
            <>
              <Image
                src={doctor?.image!}
                alt={doctor?.name!}
                height={24}
                width={24}
                className="h-8 w-fit"
              />
              <p>{doctor.name}</p>
            </>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => ColumnHeader("Actions"),
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="flex items-start gap-3">
          {rowData.status === "pending" && (
            <ScheduleAppointmentModal appointment={rowData as IAppointment} />
          )}
          {rowData.status !== "cancelled" && (
            <CancelAppointmentModal appointment={rowData as IAppointment} />
          )}
        </div>
      );
    },
  },
];
