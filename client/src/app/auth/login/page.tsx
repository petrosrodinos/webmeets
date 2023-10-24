"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.push("/meets");
        }}
      >
        click
      </button>
      login
    </div>
  );
};

export default Login;
