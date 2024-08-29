import { AppLogo } from "@/components/app-logo";
import { RegisterPatientForm } from "@/components/forms";
import { getUser } from "@/data/api";
import Image from "next/image";
import React from "react";

const Register = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const user = await getUser(userId);

  return (
    <>
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10 ">
          <AppLogo />
          {user && <RegisterPatientForm user={user} />}
          {!user && (
            <h4 className="shad-error py-12 text-lg">
              Record does not exist !
            </h4>
          )}
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="hero image"
        className="side-img max-w-[35%]"
        priority
      />
    </>
  );
};

export default Register;
