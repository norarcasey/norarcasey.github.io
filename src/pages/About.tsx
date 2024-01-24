import React from "react";

export function About(): React.ReactElement {
  return (
    <section className="tile">
      <h2>About</h2>
      <article
        style={{
          maxWidth: 400,
          marginTop: 10,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          gap: 15,
          lineHeight: "1.5rem",
        }}
      >
        <p>
          My mission is to collaborate with my team and stakeholders on
          challenging and complex frontend and full stack issues, and to deliver
          solutions that are right for the customer, reliable, and
          user-friendly.
        </p>
        <p>
          I mentor junior engineers and share my knowledge and best practices
          with others.
        </p>
        <p>
          In my spare time, I create indoor and outdoor stock photography. Check
          out my work on{" "}
          <a
            href="https://www.gettyimages.com/search/photographer?photographer=Nora%20Casey&assettype=image&sort=mostpopular&family=creative"
            target="_blank"
            rel="noreferrer"
          >
            Getty Images
          </a>
        </p>
      </article>
    </section>
  );
}
