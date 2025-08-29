import * as argon2 from 'argon2';

export const hash = async (plaintext: string): Promise<string> => {
  const argon2Options: argon2.Options & { type: number } = {
    type: argon2.argon2id,
    memoryCost: Number(process.env.ARGON2_MEMORY_COST) || 2 ** 16,
    timeCost: Number(process.env.ARGON2_TIME_COST) || 3,
    // parallelism: Number(process.env.ARGON2_PARALLELISM) || 4, // By default is 4
  };

  return await argon2.hash(plaintext, argon2Options);
};

export const comparePassword = async (hashText: string, password: string) => {
  return argon2.verify(hashText, password);
};
