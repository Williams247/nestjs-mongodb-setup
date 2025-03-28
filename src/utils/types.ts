export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface SessionProps {
  id: string;
  role: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}
