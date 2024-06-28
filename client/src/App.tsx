import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from '@/pages/home-layout.tsx';
import Home from '@/pages/home.tsx';
import { ThemeProvider } from '@/context/ThemeProvider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <div>Error</div>,
    children: [
      { index: true, element: <Home /> },
      { path: 'test', element: <div>test</div> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme={'system'} storageKey={'vite-ui-theme'}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
