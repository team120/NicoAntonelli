export type checkIsEmailTakenFunc = (mail: string) => Promise<void>;

export type hashPasswordFunc = (password: string) => Promise<string>;
