import { NavLink, Outlet } from 'react-router-dom';
import { IconUser } from '@tabler/icons-react';
import links from '@/lib/utils/links.tsx';
export default function HomeLayout() {
  return (
    <>
      <header className="sticky top-0 z-40 h-[4rem] w-full bg-gray-600 duration-500">
        <div className="mx-auto flex h-full w-4/5 items-center justify-start px-4 text-white">
          <NavLink className="mr-8 flex items-center gap-2" to="/">
            {/*<IconBallFootball size={36} />*/}
            <span>로고</span>
            <span className="text-xl font-extrabold">복리계산기</span>
          </NavLink>

          <nav className="h-[74px]">
            <ul className="flex h-full items-center space-x-8">
              {links.map((link) => (
                <div>{link.text}</div>
              ))}
            </ul>
          </nav>

          <div className="ml-auto hover:text-amber-200">
            <NavLink className="flex gap-2" to="/login">
              <IconUser stroke={2} />
              <span>로그인</span>
            </NavLink>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
