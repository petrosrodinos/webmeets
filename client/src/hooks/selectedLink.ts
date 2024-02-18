import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DrawerLinks } from "../components/Navigation";
import { HeaderLinks } from "../components/Navigation/NavigationBar";
// import { navigationStore } from "../store/navigationStore";

export const useSelectedLink = () => {
  const [selectedLink, setSelectedLink] = useState<string>("");
  const pathname = window.location.pathname;
  const searchParams = useSearchParams();
  // const { setSelectedLink } = navigationStore((state) => state);
  const allLinks = [...DrawerLinks, ...HeaderLinks];
  useEffect(() => {
    const selectedLinkId = allLinks.findIndex((link) => pathname.includes(link.path));
    if (selectedLinkId > -1) {
      setSelectedLink((selectedLinkId + 1).toString());
      return;
    }
  }, [pathname, searchParams]);

  return {
    selectedLink,
  };
};
