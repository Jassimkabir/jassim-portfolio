'use client';

import { useMemo, useRef, useState } from 'react';
import { CONTENT } from '@/content/site';

/**
 * The Daily Crossword — a fully-checked 5×5 mini puzzle (every across and
 * down entry is a real word). Type into the grid; when every white square
 * matches the solution the "EXTRA!" banner unfurls. Keyboard-friendly:
 * letters auto-advance, Backspace steps back, arrows navigate.
 */
export default function Crossword() {
  const { crossword: xw } = CONTENT;
  const solution = xw.solution as readonly (readonly (string | null)[])[];
  const rows = solution.length;
  const cols = solution[0].length;

  // standard crossword numbering: a cell starts a word if it begins an
  // across run (no white left, white right) or a down run (no white above)
  const numbers = useMemo(() => {
    const map: Record<string, number> = {};
    let n = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (solution[r][c] === null) continue;
        const leftBlock = c === 0 || solution[r][c - 1] === null;
        const rightWhite = c + 1 < cols && solution[r][c + 1] !== null;
        const upBlock = r === 0 || solution[r - 1][c] === null;
        const downWhite = r + 1 < rows && solution[r + 1][c] !== null;
        if ((leftBlock && rightWhite) || (upBlock && downWhite)) {
          map[`${r}-${c}`] = ++n;
        }
      }
    }
    return map;
  }, [solution, rows, cols]);

  const [grid, setGrid] = useState<string[][]>(() =>
    solution.map((row) => row.map(() => '')),
  );
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  const solved = solution.every((row, r) =>
    row.every((sol, c) => sol === null || grid[r][c].toUpperCase() === sol),
  );

  const focusCell = (r: number, c: number) => {
    inputs.current[`${r}-${c}`]?.focus();
    inputs.current[`${r}-${c}`]?.select();
  };

  // next / previous white cell in reading order
  const step = (r: number, c: number, dir: 1 | -1) => {
    let i = r * cols + c + dir;
    while (i >= 0 && i < rows * cols) {
      const nr = Math.floor(i / cols);
      const nc = i % cols;
      if (solution[nr][nc] !== null) {
        focusCell(nr, nc);
        return;
      }
      i += dir;
    }
  };

  const setCell = (r: number, c: number, v: string) => {
    setGrid((g) => {
      const next = g.map((row) => row.slice());
      next[r][c] = v.slice(-1).toUpperCase().replace(/[^A-Z]/g, '');
      return next;
    });
  };

  const onKey = (e: React.KeyboardEvent, r: number, c: number) => {
    const k = e.key;
    if (k === 'Backspace') {
      if (grid[r][c] === '') {
        e.preventDefault();
        step(r, c, -1);
      }
    } else if (k === 'ArrowRight') {
      e.preventDefault();
      step(r, c, 1);
    } else if (k === 'ArrowLeft') {
      e.preventDefault();
      step(r, c, -1);
    } else if (k === 'ArrowDown') {
      e.preventDefault();
      if (r + 1 < rows && solution[r + 1][c] !== null) focusCell(r + 1, c);
    } else if (k === 'ArrowUp') {
      e.preventDefault();
      if (r - 1 >= 0 && solution[r - 1][c] !== null) focusCell(r - 1, c);
    }
  };

  return (
    <section className='pad' id='crossword'>
      <div className='wrap'>
        <div className='section-front reveal'>
          <div className='folio'>
            <span className='kicker'>{xw.kicker}</span>
            <span>The Jassim Times</span>
            <span className='folio-page'>Page {xw.page}</span>
          </div>
          <h2 className='section-title'>{xw.label}</h2>
          <div className='section-rule' />
        </div>

        <div className='crossword reveal'>
          <div>
            <p className='xw-subtitle'>{xw.subtitle}</p>
            <div className='xw-board' role='group' aria-label='Crossword grid'>
              {solution.map((row, r) =>
                row.map((sol, c) => {
                  if (sol === null) {
                    return <div key={`${r}-${c}`} className='xw-cell block' aria-hidden='true' />;
                  }
                  const num = numbers[`${r}-${c}`];
                  const correct = grid[r][c].toUpperCase() === sol && grid[r][c] !== '';
                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`xw-cell${correct && solved ? ' correct' : ''}`}
                    >
                      {num ? <span className='num'>{num}</span> : null}
                      <input
                        ref={(el) => {
                          inputs.current[`${r}-${c}`] = el;
                        }}
                        value={grid[r][c]}
                        maxLength={1}
                        inputMode='text'
                        autoComplete='off'
                        aria-label={`Row ${r + 1}, column ${c + 1}`}
                        onChange={(e) => {
                          const v = e.target.value;
                          setCell(r, c, v);
                          if (v) step(r, c, 1);
                        }}
                        onKeyDown={(e) => onKey(e, r, c)}
                        onFocus={(e) => e.target.select()}
                      />
                    </div>
                  );
                }),
              )}
            </div>
          </div>

          <div className='xw-clues'>
            <div>
              <h4>Across</h4>
              <ul>
                {xw.across.map((cl) => (
                  <li key={`a${cl.n}`}>
                    <b>{cl.n}.</b>
                    {cl.clue}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Down</h4>
              <ul>
                {xw.down.map((cl) => (
                  <li key={`d${cl.n}`}>
                    <b>{cl.n}.</b>
                    {cl.clue}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`xw-win${solved ? ' show' : ''}`} role='status' aria-live='polite'>
              {solved ? xw.win : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
