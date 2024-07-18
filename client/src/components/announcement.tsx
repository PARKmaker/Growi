import { ArrowRightIcon, Blocks } from 'lucide-react';

import { Link } from 'react-router-dom';

export function Announcement() {
  return (
    <Link
      to="/docs/changelog"
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      <Blocks className="h-4 w-4" /> <span>Introducing Lift Mode</span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  );
}
