import { Prisma } from '@prisma/client';

export type PrismaModelFns = Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
