import AppointmentTable from "@/components/admin-dashboard/appointment-table";
import StatusCard from "@/components/admin-dashboard/status-card";
import { AppLogo } from "@/components/app-logo";
import { getAllAppointments } from "@/data/api";
import { IAppointment } from "@/models/appointment";
import React from "react";

const Admin = async () => {
  const appointments = await getAllAppointments();
  let initialCount = {
    scheduled: 0,
    pending: 0,
    cancelled: 0,
    total: 0,
  };
  if (appointments) {
    initialCount.total = appointments.length;
    const counts = (appointments as IAppointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduled = acc.scheduled + 1;
        } else if (appointment.status === "pending") {
          acc.pending = acc.pending + 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelled = acc.cancelled + 1;
        }
        return acc;
      },
      initialCount
    );
    initialCount = { ...counts };
  }
  return (
    <div className="mx-auto flex max-w-full flex-col space-y-10">
      <header className="admin-header">
        <AppLogo />
      </header>
      <section className="admin-main">
        <div className="w-full space-y-4">
          <h1 className="header">{`Welcome Admin !`}</h1>
          <p>Manage your new appointments here</p>
        </div>
        <div className="admin-stat">
          <StatusCard
            type="scheduled"
            count={initialCount.scheduled}
            label="Scheduled Appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatusCard
            type="pending"
            count={initialCount.pending}
            label="Pending Appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatusCard
            type="cancelled"
            count={initialCount.cancelled}
            label="Cancelled Appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </div>
        <AppointmentTable appointments={appointments} />
        <p className="copyright py-12">&copy; 2024 CarePlus</p>
      </section>
    </div>
  );
};

export default Admin;
