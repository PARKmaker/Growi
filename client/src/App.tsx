import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/context/theme-provider.tsx';

import { CompoundCalculatorPage, HomePage, KakaoLoginPage, ToolsPage } from '@/pages';
import { HomeLayout, ToolsLayout } from '@/components/layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <div>Home Error</div>,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <KakaoLoginPage /> },
      {
        path: 'tools',
        element: <ToolsLayout />,
        errorElement: <div>tools Error</div>,
        children: [
          { index: true, element: <ToolsPage /> },
          { path: 'compound-calculator', element: <CompoundCalculatorPage /> },
          { path: 'area-calculator', element: <div>area-calculator</div> },
          { path: 'make-100m-calculator', element: <div>make-100m-calculator</div> },
        ],
      },
      {
        path: 'investment',
        element: <div>investment</div>,
        errorElement: <div>tools Error</div>,
        children: [
          { index: true, element: <div>tools 메인페이지</div> },
          { path: 'ko-etf', element: <div>ko-etf</div> },
          { path: 'usa-etf', element: <div>usa-etf</div> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme={'system'} storageKey={'vite-ui-theme'}>
      <div
        className={'relative flex min-h-screen min-w-[320px] flex-col bg-gray-100 dark:bg-gray-700'}
      >
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
