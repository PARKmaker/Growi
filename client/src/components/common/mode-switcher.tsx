import useTheme from '@/hooks/use-theme';
import { Button } from '@/components/ui/button.tsx';
import { useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * Created by tkdgu:박상현 on 2024-11-22
 */
export default function ModeSwitcher() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return (
    <Button variant="ghost" className="group/toggle w-9 px-0" onClick={toggleTheme}>
      <Sun width={20} height={20} className="hidden [html.dark_&]:block" />
      <Moon width={20} height={20} className="hidden [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
