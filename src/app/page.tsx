import React from "react";
import Main from "@/app/components/pages/Main";
import Sidebar from "@/app/components/Sidebar";
import ChannelSidebar from "@/app/components/ChannelSidebar";
import {SwipeHandler} from "@/app/components/SwipeHandler";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {

    return (
        <SwipeHandler>
            <Sidebar />
            <ChannelSidebar />
            <Main />
        </SwipeHandler>
      );
};

export default Home;
