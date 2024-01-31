"use client"

import ProfileIcon from "@/app/components/ProfileIcon";
import getAvatar from "@/app/utils/getAvatar";
import SidebarIcon from "@/app/components/sidebar/SidebarIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faGear} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useUserContext} from "@/app/UserContext";

export const SidebarUser = () => {

    const { loggedInUser } = useUserContext();

    return (
        <div className="flex flex-col gap-4 h-2/10 text-center justify-center items-center">
            <hr className="w-1/3 text-heavily"/>
            <ProfileIcon imageUrl={( loggedInUser && loggedInUser.avatarPath) ? getAvatar(loggedInUser.avatarPath) : undefined} status={'online'}/>
            <SidebarIcon title={'🔔 Notifications'} icon={<FontAwesomeIcon icon={faBell}/>}/>
            <SidebarIcon title={'⚙️ Settings'} icon={<FontAwesomeIcon icon={faGear}/>}/>
        </div>
    );
};