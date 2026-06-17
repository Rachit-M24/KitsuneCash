import { API_PATHS } from "@/constants/api.constant";
import type { DashboardResponse } from "@/types/dashboardTypes/dashboardResponse.types";
import api from "./axios";

export const getDashboardData = async () => {
  return api.get<DashboardResponse>(API_PATHS.dashbaord.getDashboardData);
};