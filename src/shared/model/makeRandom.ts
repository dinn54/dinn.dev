import seedRandom from "seedrandom";

export const makeRandomNumber = (seed: string) => {
  return seedRandom(String(Date.now()) + seed);
};
