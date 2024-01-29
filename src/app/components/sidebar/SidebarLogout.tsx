"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import logout from "@/app/utils/logout";
import SidebarIcon from "@/app/components/sidebar/SidebarIcon";
import React from "react";
import {useUserContext} from "@/app/UserContext";

export const SidebarLogout = () => {

    const { setLoggedInUser } = useUserContext();

    return (
        <SidebarIcon title={'↪️ Logout'} icon={<FontAwesomeIcon icon={faRightFromBracket}
                                                                onClick={async () => setLoggedInUser(await logout())}/>}/>
    );
};