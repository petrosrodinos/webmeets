export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  avatar: string;
  isBusiness: boolean;
  birthDate: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  avatar: string;
  phone: string;
  email: string;
}

export interface EditUser {
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  avatar: string;
  birthDate: string;
}
