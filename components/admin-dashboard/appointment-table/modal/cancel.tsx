"use client";
import { Dialog } from "@/components/dialog";
import { AppointmentForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { IAppointment } from "@/models/appointment";
import React, { useState } from "react";

type CancelModalProps = {
  appointment: IAppointment;
};

export const CancelAppointmentModal = ({ appointment }: CancelModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="text-red-400 font-semibold tracking-wide">
        Cancel
      </Button>
      <Dialog
        open={open}
        closeHandler={() => setOpen(false)}
        description="Please fill the reason and cancel an appointment"
        title="Cancel Appointment"
        showSubmit={false}>
        <AppointmentForm
          type="cancel"
          patientId={appointment.$id}
          userId={appointment.userId}
          appointment={appointment}
          closeModal={setOpen}
        />
      </Dialog>
    </>
  );
};
