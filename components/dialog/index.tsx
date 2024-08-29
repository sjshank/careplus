"use client";
import {
  Dialog as ShadUIDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SyntheticEvent } from "react";
import { Button } from "../ui/button";

type DialogProps = {
  open: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  submitHandler?: (e: SyntheticEvent<HTMLElement>) => void;
  showCancel?: boolean;
  submitButtonLbl?: string;
  closeHandler: () => void;
  showSubmit?: boolean;
};

export const Dialog = ({
  open = false,
  children,
  closeHandler,
  description,
  submitHandler,
  title,
  submitButtonLbl,
  showSubmit = true,
}: DialogProps) => {
  return (
    <ShadUIDialog open={open} onOpenChange={closeHandler}>
      <DialogContent className="shad-alert-dialog">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          {showSubmit && (
            <Button
              onClick={submitHandler}
              className="shad-primary-btn w-full text-lg font-serif">
              {submitButtonLbl}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </ShadUIDialog>
  );
};
