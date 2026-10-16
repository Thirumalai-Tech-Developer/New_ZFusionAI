import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, type Agent, type AgentInput } from "@/lib/api";
import { errorMessage } from "./shared";

export const DEFAULT_AGENT: AgentInput = {
  name: "Customer Support Agent",
  instructions:
    "You are a helpful assistant for our business. Answer questions about our products, pricing and opening hours. If you don't know something, say so and offer to connect the customer with a human.",
  tools: [],
  widgetEnabled: false,
  widgetAllowedOrigins: [],
  widgetWelcome: "Hi! 👋 How can I help you today?",
  widgetColor: "#25D366",
};

export function toInput(agent: Agent): AgentInput {
  const { name, instructions, tools, widgetEnabled, widgetAllowedOrigins, widgetWelcome, widgetColor } = agent;
  return { name, instructions, tools, widgetEnabled, widgetAllowedOrigins, widgetWelcome, widgetColor };
}

export function useAgents() {
  return useQuery({
    queryKey: ["account", "agents"],
    queryFn: () => api<{ agents: Agent[] }>("/account/agents"),
  });
}

export function useSaveAgent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id?: string; input: AgentInput }) =>
      api<{ agent: Agent }>(id ? `/account/agents/${id}` : "/account/agents", {
        method: id ? "PUT" : "POST",
        body: input,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "agents"] });
      toast.success("Agent saved.");
    },
    onError: (err) => toast.error(errorMessage(err)),
  });
}

export function useDeleteAgent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api(`/account/agents/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "agents"] });
      toast.success("Agent deleted.");
    },
    onError: (err) => toast.error(errorMessage(err)),
  });
}
