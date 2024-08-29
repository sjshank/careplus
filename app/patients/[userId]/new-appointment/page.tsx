import { AppLogo } from "@/components/app-logo";
import { AppointmentForm } from "@/components/forms";
import { getPatient } from "@/data/api/patient";
import { IPatient } from "@/models/patient";
import Image from "next/image";
import React from "react";

const NewAppointment = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const patient: IPatient | undefined = await getPatient(userId);

  return (
    <>
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <AppLogo />
          {patient && (
            <AppointmentForm
              type="create"
              patientId={patient?.$id}
              userId={userId}
            />
          )}
          {!patient && (
            <h4 className="shad-error py-12 text-lg">
              Record does not exist !
            </h4>
          )}
          <p className="copyright py-12">&copy; 2024 CarePlus</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="hero image"
        className="side-img max-w-[35%]"
        priority
      />
    </>
  );
};

export default NewAppointment;
