import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
};

export const SubmitButton = ({
  children,
  isLoading,
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={`shad-primary-btn w-full text-lg font-serif ${className}`}>
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loading"
            height={24}
            width={24}
            className="animate-spin"
          />
          Loading ...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
