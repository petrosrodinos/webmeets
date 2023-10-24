import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">home</Link>
      <br />
      <Link href="/auth/login">login</Link>
      <br />
      <Link href="/meets">meets</Link>
    </nav>
  );
};

export default Navbar;
