export type Bingo = {
  words: string[];
  size: number;
  title: string;
};

export const encode = (bingo: Bingo) => {
  return btoa(JSON.stringify(bingo));
};

export const decode = (data: string) => {
  return JSON.parse(atob(data));
};
