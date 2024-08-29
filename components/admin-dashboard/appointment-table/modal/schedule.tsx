"use client";
import { Dialog } from "@/components/dialog";
import { AppointmentForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { IAppointment } from "@/models/appointment";
import React, { useState } from "react";

type ScheduleModalProps = {
  appointment: IAppointment;
};

export const ScheduleAppointmentModal = ({
  appointment,
}: ScheduleModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="text-green-300 font-semibold tracking-wide">
        Schedule
      </Button>
      <Dialog
        open={open}
        closeHandler={() => setOpen(false)}
        description="Check doctor's availability & schedule an appointment"
        title="Review & Schedule Appointment"
        submitButtonLbl="Schedule"
        showSubmit={false}>
        <AppointmentForm
          type="schedule"
          patientId={appointment.$id}
          userId={appointment.userId}
          appointment={appointment}
          closeModal={setOpen}
        />
      </Dialog>
    </>
  );
};
