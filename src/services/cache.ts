export const seconds = (num: number): number => {
  return num;
};

export const minutes = (num: number): number => {
  return num * 60;
};

export const hours = (num: number): number => {
  return minutes(num * 60);
};
