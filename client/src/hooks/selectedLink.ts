import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DrawerLinks } from "../components/Navigation";
import { HeaderLinks } from "../components/Navigation/NavigationBar";

export const useSelectedLink = () => {
  const [selectedLink, setSelectedLink] = useState<string>("");
  const pathname = window.location.pathname;
  const searchParams = useSearchParams();
  const allLinks = [...DrawerLinks, ...HeaderLinks];
  useEffect(() => {
    const selectedLinkId = allLinks.findIndex((link) => pathname == link.path);
    if (selectedLinkId > -1) {
      setSelectedLink((selectedLinkId + 1).toString());
    } else {
      setSelectedLink("7");
    }
  }, [pathname, searchParams]);

  return {
    selectedLink,
  };
};
