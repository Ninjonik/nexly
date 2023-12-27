import SidebarIcon from "@/app/components/sidebar/SidebarIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import logout from "@/app/utils/logout";
import {faBell, faGear, faInbox, faUsers} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ProfileIcon from "@/app/components/ProfileIcon";
import getAvatar from "@/app/utils/getAvatar";
import React, {FC} from "react";
import User from "@/app/utils/interfaces/User";
import {useUserContext} from "@/app/UserContext";
import Loading from "@/app/loading";

interface SidebarProps {
}

const Sidebar: FC<SidebarProps> = ({}) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();

    return (
        <aside className="w-0.5/10 h-screen flex flex-col py-4 bg-heavy text-white text-4">
            <div className="flex flex-col gap-4 h-2/10 text-center justify-center items-center">
                <SidebarIcon title={'🏠 Home'} icon={<FontAwesomeIcon icon={faDiscord}
                                                                     onClick={async () => setLoggedInUser(await logout())}/>}/>
                <hr className="w-1/3 text-heavily"/>
                <SidebarIcon title={'✉️ Inbox'} icon={<FontAwesomeIcon icon={faInbox}/>}/>
                <SidebarIcon title={'👥 Friends'} icon={<FontAwesomeIcon icon={faUsers}/>}/>
                <hr className="w-1/3 text-heavily"/>
            </div>
            <div
                className="flex flex-col gap-2 h-full text-center items-center my-4 overflow-y-scroll no-scrollbar z-0">
                <SidebarIcon title={''}
                             icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in'
                                          alt={'World War Community'} height={0} width={0}
                                          src={'/images/servers/wwc_gif_logo.gif'}/>}/>
                <SidebarIcon title={''}
                             icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in'
                                          alt={'World War Community'} height={0} width={0}
                                          src={'/images/servers/wwc_gif_logo.gif'}/>}/>
                <SidebarIcon title={''}
                             icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in'
                                          alt={'World War Community'} height={0} width={0}
                                          src={'/images/servers/wwc_gif_logo.gif'}/>}/>
                <SidebarIcon title={''}
                             icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in'
                                          alt={'World War Community'} height={0} width={0}
                                          src={'/images/servers/wwc_gif_logo.gif'}/>}/>
                <SidebarIcon title={''}
                             icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in'
                                          alt={'World War Community'} height={0} width={0}
                                          src={'/images/servers/wwc_gif_logo.gif'}/>}/>
                <SidebarIcon title={''}
                             icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in'
                                          alt={'World War Community'} height={0} width={0}
                                          src={'/images/servers/wwc_gif_logo.gif'}/>}/>
                <SidebarIcon title={''}
                             icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in'
                                          alt={'World War Community'} height={0} width={0}
                                          src={'/images/servers/wwc_gif_logo.gif'}/>}/>
                <SidebarIcon title={''}
                             icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in'
                                          alt={'World War Community'} height={0} width={0}
                                          src={'/images/servers/wwc_gif_logo.gif'}/>}/>
                <SidebarIcon title={''}
                             icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in'
                                          alt={'World War Community'} height={0} width={0}
                                          src={'/images/servers/wwc_gif_logo.gif'}/>}/>
                <SidebarIcon title={''}
                             icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in'
                                          alt={'World War Community'} height={0} width={0}
                                          src={'/images/servers/wwc_gif_logo.gif'}/>}/>
            </div>
            <div className="flex flex-col gap-4 h-2/10 text-center justify-center items-center">
                <hr className="w-1/3 text-heavily"/>
                <ProfileIcon imageUrl={getAvatar(loggedInUser.avatarPath)} status={'online'}/>
                <SidebarIcon title={'🔔 Notifications'} icon={<FontAwesomeIcon icon={faBell}/>}/>
                <SidebarIcon title={'⚙️ Settings'} icon={<FontAwesomeIcon icon={faGear}/>}/>
            </div>
        </aside>
    )
}

export default Sidebar;