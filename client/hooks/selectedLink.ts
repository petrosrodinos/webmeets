import { useEffect } from 'react';
import { navigationStore } from '@/store/navigationStore';
import { usePathname, useSearchParams } from 'next/navigation';

export const selectedLink = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setSelectedLink } = navigationStore((state) => state);
  useEffect(() => {
    setSelectedLink(pathname);
  }, [pathname, searchParams]);
};
