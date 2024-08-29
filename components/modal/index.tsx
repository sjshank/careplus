"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import { SubmitButton } from "@/components/forms/customFormField";

type ModalProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  submitHandler: (e: SyntheticEvent<HTMLElement>) => void;
  showCancel?: boolean;
  showSubmit?: boolean;
  submitButtonLbl?: string;
  closeHandler: () => void;
};

export const Modal = ({
  title,
  description,
  children,
  submitHandler,
  showCancel = false,
  submitButtonLbl = "Continue",
  closeHandler,
  showSubmit = true,
}: ModalProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const onClose = () => {
    setOpen(false);
    if (closeHandler) closeHandler();
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              height={24}
              width={24}
              onClick={onClose}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          {showCancel && <AlertDialogCancel>Cancel</AlertDialogCancel>}
          {showSubmit && (
            <AlertDialogAction onClick={submitHandler}>
              <SubmitButton isLoading={false}>{submitButtonLbl}</SubmitButton>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
