import { AppLogo } from "@/components/app-logo";
import { UserForm } from "@/components/forms";
import { Passcode } from "@/components/passcode";
import Image from "next/image";
import Link from "next/link";

const Home = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const isAdmin = searchParams["admin"] === "true";
  return (
    <>
      {isAdmin && <Passcode />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <AppLogo />
          <UserForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2024 CarePlus
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="hero image"
        className="side-img max-w-[50%]"
        priority
      />
    </>
  );
};

export default Home;
