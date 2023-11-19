import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface NavigationState {
  selectedLink: string;
  setSelectedLink: (link: string) => void;
}

const initialStateValues = {
  selectedLink: '',
};

export const navigationStore = create<NavigationState>()(
  devtools(
    persist(
      (set) => ({
        ...initialStateValues,
        setSelectedLink: (link: string) => {
          set({
            selectedLink: link,
          });
        },
      }),
      {
        name: 'navigation-webmeets',
      },
    ),
  ),
);

// export const getAuthState = (): AuthState => {
//   return authStore.getState();
// };
