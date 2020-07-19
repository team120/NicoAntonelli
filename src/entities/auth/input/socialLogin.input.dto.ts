export interface SocialLoginDto {
  name?: string;
  picture?: string;
  googleProfile: {
    id: string;
    refreshToken: string;
  };
}
