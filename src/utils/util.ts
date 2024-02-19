// utils.ts
// import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const parseRequestBody = (body: string): any => {
  return JSON.parse(body);
};
