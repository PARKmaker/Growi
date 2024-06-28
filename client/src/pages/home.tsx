import { useEffect, useState } from 'react';
import { checkDefaultTheme } from '@/lib/utils/checkTheme.ts';
import { Button } from '@/components/ui/button.tsx';
import useTheme from '@/lib/hooks/useTheme.tsx';
import { ModeToggle } from '@/components/mode-toggle.tsx';

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const { setTheme } = useTheme();

  useEffect(() => {
    console.log(localStorage.theme);
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  // function toggleDarkMode() {
  //   let newThemeName = 'dark';
  //
  //   if (isDarkTheme) {
  //     newThemeName = 'light';
  //   }
  //
  //   localStorage.theme = newThemeName;
  //   // // Whenever the user explicitly chooses to respect the OS preference
  //   // 라이트, 다크, 시스템 기준
  //   // localStorage.removeItem('theme');
  //
  //   setIsDarkTheme((prevState) => !prevState);
  // }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <ModeToggle/>
      
    </div>
  );
}
