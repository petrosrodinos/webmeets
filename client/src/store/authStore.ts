import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  token: string;
  username: string;
  role: string;
  avatar: string;
  userId: string;
  exp: number;
  logOut: () => void;
  logIn: (payload: any) => void;
  updateProfile: (payload: any) => void;
}

const initialStateValues = {
  isLoggedIn: false,
  token: '',
  username: '',
  userId: '',
  role: '',
  avatar: '',
  exp: 0,
};

export const authStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        ...initialStateValues,
        logOut: () => {
          set({
            ...initialStateValues,
          });
        },
        logIn: (payload: any) =>
          set({
            isLoggedIn: true,
            token: payload.token,
            username: payload.firstname + ' ' + payload.lastname,
            avatar: payload?.avatar,
            role: payload.role,
            userId: payload.userId,
            exp: payload.exp,
          }),
        updateProfile: (payload: any) =>
          set((state) => ({
            ...state,
            ...payload,
          })),
      }),
      {
        name: 'auth-webmeets',
      },
    ),
  ),
);

export const getAuthState = (): AuthState => {
  return authStore.getState();
};
