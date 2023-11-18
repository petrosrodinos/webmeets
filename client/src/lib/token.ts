import * as jose from 'jose';

interface Token {
  userId: string;
  profileId: string;
  exp: number;
  role: string;
}

export const decodeToken = (token: string): Token => {
  const decoded: any = jose.decodeJwt(token);
  console.log('decoded', decoded);
  const data: Token = {
    userId: decoded.userId,
    exp: decoded.exp,
    role: decoded.role,
    profileId: decoded.profileId,
  };
  return data;
};
