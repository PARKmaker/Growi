import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SiteFooter from '@/components/site-footer.tsx';
import SiteHeader from '@/components/site-header/site-header.tsx';

export default function HomeLayout() {
  const [upButtonActive, setUpButtonActive] = useState(false);
  const upButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 스크롤 이동시 Up 버튼 상태를 관리하는 effect
    function onScroll() {
      if (upButtonRef && upButtonRef.current) {
        const scrollTop = window.scrollY - 600; //현재 위치, 600은 적당히 스크롤한 상태의 위치값
        //현재 페이지 상단
        const pagePosTop = upButtonRef.current.getBoundingClientRect().top + window.scrollY;
        if (pagePosTop < scrollTop) {
          setUpButtonActive(true);
        } else {
          setUpButtonActive(false);
        }
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [upButtonActive]);

  function handleScrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (
    <>
      <SiteHeader />
      {/*Todo: 320px 이하일때 백그라운드 배경이 짤리는 문제*/}
      <main ref={upButtonRef} className={'flex-1 bg-gray-100 dark:bg-gray-700'}>
        <Outlet />
      </main>
      <SiteFooter />
      {upButtonActive ? (
        <button
          className="fixed bottom-[35px] left-auto right-[35px] z-50 h-[45px] w-[45px] border bg-[#fff] shadow-lg"
          onClick={handleScrollToTop}
          type="button"
        >
          Up
        </button>
      ) : null}
    </>
  );
}
