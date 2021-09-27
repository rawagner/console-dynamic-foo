import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ExtensionConsumerChild from "./ExtensionConsumerChild";

const ExtensionConsumer: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ExtensionConsumerChild />
    </QueryClientProvider>
  );
};

export default ExtensionConsumer;
