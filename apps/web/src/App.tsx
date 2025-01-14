import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Home } from "./page";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 5, // Cache for 5 minutes
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
