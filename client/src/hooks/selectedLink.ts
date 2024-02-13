import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DrawerLinks } from "../components/Navigation";
import { HeaderLinks } from "../components/Navigation/NavigationBar";
import { navigationStore } from "../store/navigationStore";

export const selectedLink = () => {
  const pathname = window.location.pathname;
  const searchParams = useSearchParams();
  const { setSelectedLink } = navigationStore((state) => state);
  const allLinks = [...DrawerLinks, ...HeaderLinks];
  useEffect(() => {
    const selectedLinkId = allLinks.findIndex((link) => link.path === pathname);
    if (selectedLinkId > -1) {
      setSelectedLink((selectedLinkId + 1).toString());
      return;
    }
  }, [pathname, searchParams]);
};
