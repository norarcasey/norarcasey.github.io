import React from "react";

interface NpmBadgeProps {
  /** Full scoped npm package name, e.g. "@norarcasey/star-siege-nora". */
  npmPackage: string;
  /** Project name, used in the link and image labels. */
  title: string;
}

/**
 * Shields.io version badge linking to a package on npm. The badge label is the
 * unscoped package name, which is what you'd type to install it.
 */
export function NpmBadge({
  npmPackage,
  title,
}: NpmBadgeProps): React.ReactElement {
  const shortName = npmPackage.replace(/^@[^/]+\//, "");

  return (
    <div>
      <a
        href={`https://www.npmjs.com/package/${npmPackage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View the ${title} package on npm`}
      >
        <img
          src={`https://img.shields.io/npm/v/${npmPackage}?logo=npm&label=${shortName}`}
          alt={`${title} npm version`}
        />
      </a>
    </div>
  );
}
