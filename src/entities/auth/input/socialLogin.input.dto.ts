export interface SocialLoginDto {
  name?: string;
  lastName?: string;
  mail?: string;
  picture?: string;
  university: {
    id: number;
  };
  googleProfile: {
    id: string;
    refreshToken: string;
  };
}
