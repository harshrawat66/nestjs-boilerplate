export interface PrismaModelActions<T> {
  findUnique(payload: any): Promise<T>;
  findMany(): Promise<T[]>;
  findFirst(payload: any): Promise<T>;
  create(payload: any): Promise<T>;
  createMany(payload: any): Promise<T>;
  update(payload: any): Promise<T>;
  updateMany(payload: any): Promise<T>;
  upsert(payload: any): Promise<T>;
  delete(payload: any): Promise<T>;
  deleteMany(payload: any): Promise<T>;
  executeRaw(payload: any): Promise<T>;
  queryRaw(payload: any): Promise<T>;
  aggregate(payload: any): Promise<T>;
  count(payload: any): Promise<T>;
  runCommandRaw(payload: any): Promise<T>;
  findRaw(payload: any): Promise<T>;
}
