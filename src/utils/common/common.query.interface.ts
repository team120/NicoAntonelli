export type getQueryFunc = <T>(
  type: { new (...args: any[]): T },
  include?: string[],
) => Promise<T[]>;

export type getOneQueryFunc = <T>(
  type: { new (...args: any[]): T },
  id: number,
  include?: string[],
) => Promise<T>;

export type saveQueryFunc = <R, T>(
  type: { new (...args: any[]): T },
  value: R,
) => Promise<T>;
