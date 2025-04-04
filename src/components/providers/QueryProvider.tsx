'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ProviderProps = {} & JSX.IntrinsicElements['div'];

const QueryProvider: React.FC<ProviderProps> = (props) => {
  const { children } = props;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15 * 1000,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
