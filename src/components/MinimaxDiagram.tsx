import React from "react";
import { Box, Typography } from "@mui/material";

import { ACCENT_BLUE, ACCENT_PINK, DECORATIVE_PINK } from "../colors";

const CELL = 24;
const BOARD = CELL * 3;

/** A board as three rows of "X", "O", or "." */
type Board = [string, string, string];

const START: Board = ["XX.", ".O.", "..."];
const BLOCKS: Board = ["XXO", ".O.", "..."];
const ELSEWHERE: Board = ["XX.", ".O.", "O.."];

interface MiniBoardProps {
  board: Board;
  /** Top-left corner of the board in viewBox units. */
  x: number;
  y: number;
}

/**
 * One 3x3 position: dashed grid lines with X drawn as two strokes and O as a
 * circle, matching the accent colors used everywhere else on the site.
 */
function MiniBoard({ board, x, y }: MiniBoardProps): React.ReactElement {
  const marks: React.ReactElement[] = [];

  board.forEach((row, rowIndex) => {
    [...row].forEach((mark, columnIndex) => {
      const cx = x + columnIndex * CELL + CELL / 2;
      const cy = y + rowIndex * CELL + CELL / 2;
      const key = `${rowIndex}-${columnIndex}`;
      if (mark === "X") {
        marks.push(
          <g
            key={key}
            stroke={ACCENT_BLUE}
            strokeWidth={2}
            strokeLinecap="round"
          >
            <line x1={cx - 6} y1={cy - 6} x2={cx + 6} y2={cy + 6} />
            <line x1={cx + 6} y1={cy - 6} x2={cx - 6} y2={cy + 6} />
          </g>
        );
      } else if (mark === "O") {
        marks.push(
          <circle
            key={key}
            cx={cx}
            cy={cy}
            r={6.5}
            fill="none"
            stroke={ACCENT_PINK}
            strokeWidth={2}
          />
        );
      }
    });
  });

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={BOARD}
        height={BOARD}
        fill="#ffffff"
        stroke={DECORATIVE_PINK}
        strokeWidth={1}
      />
      <g stroke={DECORATIVE_PINK} strokeWidth={1}>
        <line x1={x + CELL} y1={y} x2={x + CELL} y2={y + BOARD} />
        <line x1={x + CELL * 2} y1={y} x2={x + CELL * 2} y2={y + BOARD} />
        <line x1={x} y1={y + CELL} x2={x + BOARD} y2={y + CELL} />
        <line x1={x} y1={y + CELL * 2} x2={x + BOARD} y2={y + CELL * 2} />
      </g>
      {marks}
    </g>
  );
}

interface ValueChipProps {
  /** Horizontal center of the chip. */
  cx: number;
  y: number;
  label: string;
}

function ValueChip({ cx, y, label }: ValueChipProps): React.ReactElement {
  const width = 190;
  return (
    <g>
      <rect
        x={cx - width / 2}
        y={y}
        width={width}
        height={28}
        rx={4}
        fill="none"
        stroke={ACCENT_BLUE}
        strokeWidth={1}
      />
      <text
        x={cx}
        y={y + 19}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="#363435"
      >
        {label}
      </text>
    </g>
  );
}

/**
 * A two-ply slice of the search Nora runs before each move: one position, the
 * two kinds of reply available to her, and what each is worth once the opponent
 * answers optimally.
 */
export function MinimaxDiagram(): React.ReactElement {
  return (
    <Box>
      <Typography
        variant="h6"
        component="h2"
        sx={{ color: ACCENT_BLUE, mb: 1 }}
      >
        How minimax picks her move
      </Typography>

      {/* Below ~600px the diagram would scale its labels down to an unreadable
          size, so it keeps a legible minimum width and scrolls inside this
          container instead of shrinking. The paragraph below carries the same
          information for anyone who would rather not scroll. */}
      <Box sx={{ overflowX: "auto", mt: 1, pb: 1 }}>
        <Box
          component="svg"
          viewBox="0 0 720 372"
          role="img"
          aria-labelledby="minimax-title minimax-desc"
          sx={{
            width: "100%",
            minWidth: 600,
            maxWidth: 720,
            height: "auto",
            display: "block",
            mx: "auto",
          }}
        >
          <title id="minimax-title">
            A minimax game tree for one Nora move in tic-tac-toe
          </title>
          <desc id="minimax-desc">
            From a position where X threatens the top row, Nora&apos;s two kinds
            of reply are compared. Blocking the top row is worth 0, a draw.
            Playing anywhere else is worth minus 1, because X then completes the
            row and wins. Nora is the maximizing player, so she takes the higher
            value and blocks.
          </desc>

          {/* Level 1: the position Nora is handed */}
          <text
            x={360}
            y={16}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="#363435"
          >
            Nora (O) to move &#183; MAX takes the highest value
          </text>
          <MiniBoard board={START} x={360 - BOARD / 2} y={28} />
          <text
            x={360}
            y={122}
            textAnchor="middle"
            fontSize="12"
            fill="#4a4f57"
          >
            X threatens the top row
          </text>

          {/* Edges down to the two kinds of reply */}
          <g stroke={DECORATIVE_PINK} strokeWidth={1}>
            <line x1={340} y1={128} x2={200} y2={168} />
            <line x1={380} y1={128} x2={520} y2={168} />
          </g>
          {/* A white halo behind the edge labels keeps them legible where they
            cross the branch lines. */}
          <g
            fontSize="12"
            fill="#4a4f57"
            stroke="#ffffff"
            strokeWidth={4}
            paintOrder="stroke"
          >
            <text x={232} y={152} textAnchor="middle">
              she blocks
            </text>
            <text x={492} y={152} textAnchor="middle">
              anything else
            </text>
          </g>

          {/* Level 2: your reply, where the opponent minimizes */}
          <MiniBoard board={BLOCKS} x={200 - BOARD / 2} y={172} />
          <MiniBoard board={ELSEWHERE} x={520 - BOARD / 2} y={172} />
          <text
            x={360}
            y={268}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="#363435"
          >
            You (X) reply &#183; MIN takes the lowest value
          </text>

          {/* The value each branch is worth after the best reply */}
          <ValueChip cx={200} y={286} label="0 &#183; draw with best play" />
          <ValueChip cx={520} y={286} label="&#8722;1 &#183; X wins" />

          <text
            x={360}
            y={344}
            textAnchor="middle"
            fontSize="13"
            fill="#363435"
          >
            0 beats &#8722;1, so the block is the move she plays.
          </text>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        {/* The showcase block is shrink-to-fit, so any unconstrained paragraph
          here would contribute its full single-line max-content width and
          stretch the whole page. Cap it, as the stack facts do. */}
        <Typography
          variant="body2"
          sx={{ color: "#4a4f57", mt: 1.5, maxWidth: "72ch" }}
        >
          The real search continues until every branch ends in a win, loss, or
          draw, then carries those values back up: Nora takes the highest at her
          turns, you take the lowest at yours. The full tree is small enough to
          search exhaustively, so she always plays the move with the best
          guaranteed outcome. With best play from both sides, the game is a
          draw.
        </Typography>
      </Box>
    </Box>
  );
}
