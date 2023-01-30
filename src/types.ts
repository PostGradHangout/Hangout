
export type Scoreboard = {
  X: number,
  O: number
}

export type Player = ('X'|'O') ;

export type BoardText = 'X'|'O'|'-'; 

export type BoardContent = ('X'|'O'|'-')[][]

export interface RowProps { row:number; board:BoardContent; handleBoxClick(): void }

export interface BoxProps extends RowProps { col:number }