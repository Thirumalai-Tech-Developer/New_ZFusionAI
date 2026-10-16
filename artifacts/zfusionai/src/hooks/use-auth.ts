import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, ApiError, type PublicUser } from "@/lib/api";

export function useAuth() {
  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        return (await api<{ user: PublicUser }>("/auth/me")).user;
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) return null;
        throw err;
      }
    },
    staleTime: 60_000,
    retry: false,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api("/auth/logout", { method: "POST" }),
    onSuccess: () => {
      queryClient.setQueryData(["auth", "me"], null);
      queryClient.removeQueries({ queryKey: ["account"] });
    },
  });
}

export function useAuthProviders() {
  return useQuery({
    queryKey: ["auth", "providers"],
    queryFn: () => api<{ google: boolean; github: boolean }>("/auth/providers"),
    staleTime: Infinity,
  });
}
