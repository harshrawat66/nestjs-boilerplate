declare module 'cluster' {
  const isMaster: boolean;
  const workers: any[];
  function fork();
  function on(action: string, callback: (worker: any, code: any, signal: any) => void);
}
