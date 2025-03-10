export interface UserPayload {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  image?: string;
  verified?: boolean;
  role: string;
  disabled?: boolean;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
