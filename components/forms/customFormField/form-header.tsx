import React from "react";

export const FormHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="space-y-4">
      <h1 className="header">{title}</h1>
      <p className="text-dark-700">{description}</p>
    </div>
  );
};
