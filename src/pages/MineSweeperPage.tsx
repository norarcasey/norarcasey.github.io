import React, { useState } from "react";
import { MineSweeper, Difficulty } from "@norarcasey/mine-sweeper";

export function MineSweeperPage(): React.ReactElement {
  const [difficulty, setDifficulty] = useState(Difficulty.Beginner);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="radio"
          id="beginner"
          name="difficulty"
          value={Difficulty.Beginner}
          checked={difficulty === Difficulty.Beginner}
          onChange={() => setDifficulty(Difficulty.Beginner)}
        />
        <label htmlFor="beginner">Beginner</label>
        <input
          type="radio"
          id="intermediate"
          name="difficulty"
          value={Difficulty.Intermediate}
          checked={difficulty === Difficulty.Intermediate}
          onChange={() => setDifficulty(Difficulty.Intermediate)}
        />
        <label htmlFor="intermediate">Intermediate</label>
        <input
          type="radio"
          id="expert"
          name="difficulty"
          value={Difficulty.Expert}
          checked={difficulty === Difficulty.Expert}
          onChange={() => setDifficulty(Difficulty.Expert)}
        />
        <label htmlFor="expert">Expert</label>
      </div>

      {difficulty === 10 && <MineSweeper difficulty={difficulty} />}
      {difficulty === 40 && <MineSweeper difficulty={difficulty} />}
      {difficulty === 99 && <MineSweeper difficulty={difficulty} />}
    </div>
  );
}
