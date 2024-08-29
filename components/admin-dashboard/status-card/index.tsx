import { TStatus } from "@/models/appointment";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

type StatusCardProps = {
  type: TStatus;
  count: number;
  label: string;
  icon: string;
};

const StatusCard = ({ type, count, icon, label }: StatusCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "scheduled",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}>
      <div className="flex items-center gap-4">
        <Image src={icon} alt={label} height={30} width={30} />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatusCard;
