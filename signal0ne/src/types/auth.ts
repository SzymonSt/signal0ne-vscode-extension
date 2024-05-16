import { JwtPayload } from 'jwt-decode';

export interface Signal0neJwtPayload extends JwtPayload {
  exp: number;
  id: string;
  userName: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
