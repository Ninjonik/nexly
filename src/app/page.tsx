import React from "react";
import Main from "@/app/components/pages/Main";
import Sidebar from "@/app/components/Sidebar";
import ChannelSidebar from "@/app/components/ChannelSidebar";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {

    return (
        <>
            <Sidebar />
            <ChannelSidebar />
            <Main />
        </>
      );
};

export default Home;
