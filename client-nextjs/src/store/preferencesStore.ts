import { Roles } from 'enums/roles';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PreferencesStoreState {
  roleView: Roles;
  drawerView: string;
  setPreferences: (payload: any) => void;
}

const initialStateValues = {
  roleView: Roles.USER,
  drawerView: 'full',
};

export const preferencesStore = create<PreferencesStoreState>()(
  devtools(
    persist(
      (set) => ({
        ...initialStateValues,
        setPreferences: (payload: any) =>
          set((state) => ({
            ...state,
            ...payload,
          })),
      }),
      {
        name: 'webmeets-preferences',
      },
    ),
  ),
);

// export const getAuthState = (): AuthState => {
//   return authStore.getState();
// };
