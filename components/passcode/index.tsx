"use client";

import { SyntheticEvent, useState } from "react";
import { Modal } from "@/components/modal";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

export const Passcode = () => {
  const [passkey, setPassKey] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const validatePassKey = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    if (passkey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setError("Invalid passcode entered.");
      return;
    }
    setError("");
    router.push("/admin");
  };

  const onClose = () => {
    router.push("/");
  };

  return (
    <Modal
      title="Admin Access Validation"
      description="To access the admin page, please enter the passcode."
      submitHandler={validatePassKey}
      submitButtonLbl="Continue"
      closeHandler={onClose}>
      <InputOTP
        maxLength={6}
        value={passkey}
        onChange={(value) => setPassKey(value)}>
        <InputOTPGroup className="shad-otp">
          <InputOTPSlot className="shad-otp-slot" index={0} />
          <InputOTPSlot index={1} className="shad-otp-slot" />
          <InputOTPSlot index={2} className="shad-otp-slot" />
          <InputOTPSlot index={3} className="shad-otp-slot" />
          <InputOTPSlot index={4} className="shad-otp-slot" />
          <InputOTPSlot index={5} className="shad-otp-slot" />
        </InputOTPGroup>
      </InputOTP>
      <span className="shad-error ml-1 text-center">{error}</span>
    </Modal>
  );
};
