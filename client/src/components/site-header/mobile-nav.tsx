/**
 * Created by tkdgu:박상현 on 2024-11-29
 */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';
import links from '@/lib/links.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Icons } from '@/components/icons.tsx';
import { siteConfig } from '@/config/site.ts';

export default function MobileNav() {
  const [open, setOpen] = React.useState(false);

  function onOpenChange(open: boolean) {
    setOpen(open);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="mx-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="!size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="overflow-auto p-6">
            <div className="flex flex-col space-y-3">
              {links.map(
                (link) =>
                  link.path && (
                    <NavLink
                      to={link.path}
                      onClick={() => {
                        onOpenChange(false);
                      }}
                      className={({ isActive, isPending }) =>
                        cn(
                          'text-foreground/50 transition-colors hover:text-foreground/70',
                          isPending ? 'text-foreground/50' : isActive ? 'text-foreground' : '',
                        )
                      }
                    >
                      {link.text}
                    </NavLink>
                  ),
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Link to={'/'} className={'flex w-full items-center justify-center space-x-2 md:hidden'}>
        <Icons.logo2 className={'h-6 w-6'} />
        <span className={'font-bold'}>{siteConfig.name}</span>
      </Link>
    </>
  );
}
