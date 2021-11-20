import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const handler = async ({ query }: any) => db.$queryRawUnsafe(query);
