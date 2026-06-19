import { getDashboardData } from "@/api/dashboard.api";
import type { DashboardResponse } from "@/types/dashboardTypes/dashboardResponse.types";
import { create } from "zustand";

interface DashboardState {
  DashboardResponse: DashboardResponse;
}

const initialState: DashboardState = {
   DashboardResponse: {} as DashboardResponse,
};
export const dashboardStore = create<DashboardState>((set) => ({
  ...initialState,
  actions: {
    getDashboardResponse: async () => {
      const response = await getDashboardData();
      set({
        DashboardResponse: response.data,
      });
    }
  },
}));