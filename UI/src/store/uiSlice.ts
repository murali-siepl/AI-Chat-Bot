import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  isMobileMenuOpen: boolean;
  isSidebarCollapsed: boolean;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  isSidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
  },
});

export const { toggleMobileMenu, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;