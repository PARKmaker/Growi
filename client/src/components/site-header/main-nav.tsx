import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '@/config/site.ts';
import { Icons } from '@/components/icons.tsx';
import { cn } from '@/lib/utils.ts';
import links from '@/lib/links.tsx';

export default function MainNav() {
  return (
    <div className={'mr-4 hidden md:flex'}>
      <Link to={'/'} className={'mr-6 flex items-center space-x-2'}>
        <Icons.logo2 className={'h-6 w-6'} />
        <span className={'hidden font-bold sm:inline-block'}>{siteConfig.name}</span>
      </Link>
      <nav className={'flex items-center gap-4 text-sm lg:gap-6'}>
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive, isPending }) =>
              cn(
                'text-foreground/50 transition-colors hover:text-foreground/70',
                isPending ? 'text-foreground/50' : isActive ? 'text-foreground' : '',
              )
            }
          >
            {link.text}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
