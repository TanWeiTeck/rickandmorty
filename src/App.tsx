import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Contacts from './pages/Contacts';
import ErrorPage from './pages/ErrorPage';
import CharacterContextProvider from './Contexts/contactContextProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import Character from './pages/Contacts/Character';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        },
    },
});

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: 'contacts',
                    element: <Contacts />,
                    children: [
                        {
                            path: ':id',
                            element: <Character />,
                        },
                    ],
                },
            ],
        },
    ]);

    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <CharacterContextProvider>
                    <RouterProvider router={router} />
                </CharacterContextProvider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
