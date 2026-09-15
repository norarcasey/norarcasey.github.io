import React from "react";

interface EducationItemProps {
  school: string;
  degree: string;
  graduationDate: string;
}

export function EducationItem({
  school,
  degree,
  graduationDate,
}: EducationItemProps): React.ReactElement {
  return (
    <div className="resume-entry mt-3">
      <h3 className="text-text text-base leading-6 font-semibold">
        {school} | {graduationDate}
      </h3>
      <p className="copy text-sm leading-5">{degree}</p>
    </div>
  );
}
