import type { DashboardResponse } from "@/types/dashboardTypes/dashboardResponse.types";
import { create } from "axios";

interface DashboardState {
  DashboardResponse: DashboardResponse;
}

const initialState: DashboardState = {
   DashboardResponse: {} as DashboardResponse,
};
export const dashboardStore = create<DashboardState>((set) => ({
  ...initialState,
  actions: {
    ...initialState.actions,
  },
  getDashboardResponse: async () =>{
    const response = await dashboardData();
    set((state) => ({
      DashboardResponse: response.data,
    }));
  }
}));