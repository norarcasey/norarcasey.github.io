import React from "react";
import { Box, Typography } from "@mui/material";

import { ExternalLink } from "./ExternalLink";

export function About(): React.ReactElement {
  return (
    <section className="tile">
      <Typography variant="h3" component="h2">
        About me
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="body1">
          <strong>My mission:</strong>{" "}
          <span>
            Build software that empowers people. I want to create tools that
            make lives and work easier, delivering real, measurable value
            through speed, efficiency, and user-friendliness.
          </span>
        </Typography>
        <Typography variant="body1">
          <strong>Collaboration champion:</strong>{" "}
          <span>
            I thrive in teams, tackling complex frontend and full-stack
            challenges alongside stakeholders. My focus? Solutions that are
            customer-centric, reliable, and intuitive.
          </span>
        </Typography>
        <Typography variant="body1">
          <strong>Passionate mentor:</strong>{" "}
          <span>
            I believe in fostering talent. By combining active listening, clear
            goal-setting, and leading by example, I help others unlock their
            potential and achieve their goals.
          </span>
        </Typography>
        <Typography variant="body1">
          <strong>Beyond the code:</strong>{" "}
          <span>
            In my free time, I build crossword puzzles you can find at{" "}
            <ExternalLink url="https://crucinora.com" label="crucinora.com" />.
            I'm also an avid traveler, with 20+ countries across four continents
            explored so far, and a photographer (see my work on{" "}
            <ExternalLink
              url="https://www.gettyimages.com/search/photographer?photographer=Nora%20Casey&assettype=image&sort=mostpopular&family=creative"
              label="Getty Images"
            />
            ). My latest passion is improv, where I take classes and perform at
            the{" "}
            <ExternalLink
              url="https://www.barcelonaimprovgroup.com/"
              label="Barcelona Improv Group"
            />
            . I also hold an MS in Computer Science from Georgia Tech.
          </span>
        </Typography>
      </Box>
    </section>
  );
}
