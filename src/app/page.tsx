"use client"

import React from "react";
import Main from "@/app/components/pages/Main";
import Login from "@/app/components/pages/Login";

interface HomeProps {
  // Add any specific props for the Home component here
}

const Home: React.FC<HomeProps> = () => {

  const loggedIn = false

  return (
      loggedIn ? (
        <Main />
      ) : (
        <Login />
      )

  );
};

export default Home;
