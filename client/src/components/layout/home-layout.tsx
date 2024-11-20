import { Outlet } from 'react-router-dom';
import SiteFooter from '@/components/site-footer.tsx';
import SiteHeader from '@/components/site-header/site-header.tsx';
export default function HomeLayout() {
  return (
    <>
      <SiteHeader />
      <main className={'flex-1 bg-gray-100 dark:bg-gray-700'}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
