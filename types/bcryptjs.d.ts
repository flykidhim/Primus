declare module "bcryptjs" {
  export function compare(data: string, encrypted: string): Promise<boolean>;
  export function compareSync(data: string, encrypted: string): boolean;
  export function hash(data: string, rounds: number): Promise<string>;
  export function hashSync(data: string, rounds: number): string;
  const _default: {
    compare: typeof compare;
    compareSync: typeof compareSync;
    hash: typeof hash;
    hashSync: typeof hashSync;
  };
  export default _default;
}
