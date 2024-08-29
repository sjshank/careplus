import { AppLogo } from "@/components/app-logo";
import { getAppointment } from "@/data/api";
import { Doctors } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import { IAppointment } from "@/models/appointment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SuccessPage = async ({
  params: { userId },
  searchParams,
}: {
  params: { userId: string };
  searchParams: { [key: string]: string };
}) => {
  const { appointmentId } = searchParams;
  const appointment: IAppointment | undefined = await getAppointment(
    appointmentId
  );
  const doctor = Doctors.find(
    (doc) => appointment && doc.name === appointment?.primaryPhysician
  );
  return (
    <>
      <div className="success-img">
        <AppLogo />
        {appointment && (
          <div className="flex flex-col items-center">
            <Image
              height={300}
              width={280}
              alt="success"
              src="/assets/gifs/success.gif"
            />
            <h2 className="text-center mb-6 max-w-[600px] header">
              Your <span className="text-green-500">appointment request</span>{" "}
              has been successfully submitted!
            </h2>
          </div>
        )}
        <div className="request-details">
          <p>Appointment details:</p>
          <div className="flex items-center gap-3">
            {doctor && (
              <>
                <Image
                  src={doctor?.image!}
                  alt="primary physician"
                  height={100}
                  width={100}
                  className="size-6"
                />
                <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              height={24}
              width={24}
            />
            {appointment && (
              <p className="whitespace-nowrap">
                {formatDateTime(appointment?.schedule!).dateTime}
              </p>
            )}
          </div>
        </div>
        <Link
          href={`/patients/${userId}/new-appointment`}
          className="text-green-400 underline-offset-1 underline tracking-wider">
          New Appointment
        </Link>
        <p className="copyright py-2">&copy; 2024 CarePlus</p>
      </div>
    </>
  );
};

export default SuccessPage;
