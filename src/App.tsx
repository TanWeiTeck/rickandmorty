import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Contacts from "./pages/Contacts";
import CharacterBoard from "./pages/Contacts/ContactBoard/CharacterBoard";
import ErrorPage from "./pages/ErrorPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes,
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "contacts",
          element: <Contacts />,
          children: [
            {
              path: ":id",
              element: <CharacterBoard />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
