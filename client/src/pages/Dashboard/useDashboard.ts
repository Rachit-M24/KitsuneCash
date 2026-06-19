import { useCallback, useEffect, useState } from "react";
import { getDashboardData } from "@/api/dashboard.api";
import { getErrorMessage } from "@/lib/get-error-message";
import { dashboardStore } from "@/store/dashboard.store";

export function useDashboard() {
  const dashboardResponse = dashboardStore((state) => state.DashboardResponse);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getDashboardData();
      dashboardStore.setState({ DashboardResponse: response.data });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboardResponse,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
}
