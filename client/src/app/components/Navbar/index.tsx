import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">home</Link>
      <Link href="/login">login</Link>
    </nav>
  );
};

export default Navbar;
