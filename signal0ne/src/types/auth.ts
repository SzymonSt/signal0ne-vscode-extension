import { JwtPayload } from 'jwt-decode';

export interface AuthDataNode {
  description: string;
  iconPath: string;
  id: string;
  label: string;
  parent?: AuthDataNode;
}

export interface Signal0neJwtPayload extends JwtPayload {
  exp: number;
  id: string;
  userName: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
