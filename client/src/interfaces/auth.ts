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
}
