import React from "react";

interface ResumeExperienceProps {
  title: string;
  company: string;
  companyDescription?: string;
  employmentDate: string;
  duties: string[];
}

export function ResumeExperience({
  title,
  company,
  companyDescription,
  employmentDate,
  duties,
}: ResumeExperienceProps): React.ReactElement {
  return (
    <div className="resume-entry mt-4">
      <h3 className="text-text text-base leading-6 font-semibold">
        {title} | {company}
      </h3>
      {companyDescription ? (
        <p className="copy text-sm leading-5">{companyDescription}</p>
      ) : null}
      <p className="meta">{employmentDate}</p>
      {/* list-disc explicitly: Tailwind's preflight, which would otherwise
          supply it, is off until UI-19. */}
      <ul className="copy mt-2 list-disc pl-6 text-sm leading-6">
        {duties.map((duty, index) => (
          <li key={`${company}-${title}-${duty}-${index}`}>{duty}</li>
        ))}
      </ul>
    </div>
  );
}
