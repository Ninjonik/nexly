"use client"

import Image from 'next/image';
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons"
import {
  faInbox,
  faPenToSquare,
  faThumbtack,
  faUsers,
  faEnvelope,
  faMagnifyingGlass,
  faMicrophone, faVideo, faHeadphones, faBell, faGear, faPhone, faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons";
import MessagesSection from "@/app/components/MessagesSection";
import SidebarIcon from "@/app/components/sidebar/SidebarIcon";
import ProfileIcon from "@/app/components/ProfileIcon";
import SmallIcon from "@/app/components/SmallIcon";
import ChannelMain from "@/app/components/ChannelMain";
import {faFileLines} from "@fortawesome/free-regular-svg-icons";
import FormInput from "@/app/components/form/FormInput";

interface HomeProps {
  // Add any specific props for the Home component here
}

const Home: React.FC<HomeProps> = () => {
  return (
      <div className="w-screen h-screen overflow-hidden flex flex-row">
        <aside className="w-0.5/10 h-screen flex flex-col py-4 bg-heavy text-white text-4">
          <div className="flex flex-col gap-4 h-2/10 text-center justify-center items-center">
            <SidebarIcon title={'🏠 Home'} icon={<FontAwesomeIcon icon={faDiscord} />} />
            <hr className="w-1/3 text-heavily" />
            <SidebarIcon title={'✉️ Inbox'} icon={<FontAwesomeIcon icon={faInbox} />} />
            <SidebarIcon title={'👥 Friends'} icon={<FontAwesomeIcon icon={faUsers} />} />
            <hr className="w-1/3 text-heavily" />
          </div>
          <div className="flex flex-col gap-2 h-full text-center items-center my-4 overflow-y-scroll no-scrollbar z-0">
            <SidebarIcon title={''} icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in' alt={'World War Community'} height={0} width={0} src={'/images/servers/wwc_gif_logo.gif'}/>} />
            <SidebarIcon title={''} icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in' alt={'World War Community'} height={0} width={0} src={'/images/servers/wwc_gif_logo.gif'}/>} />
            <SidebarIcon title={''} icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in' alt={'World War Community'} height={0} width={0} src={'/images/servers/wwc_gif_logo.gif'}/>} />
            <SidebarIcon title={''} icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in' alt={'World War Community'} height={0} width={0} src={'/images/servers/wwc_gif_logo.gif'}/>} />
            <SidebarIcon title={''} icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in' alt={'World War Community'} height={0} width={0} src={'/images/servers/wwc_gif_logo.gif'}/>} />
            <SidebarIcon title={''} icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in' alt={'World War Community'} height={0} width={0} src={'/images/servers/wwc_gif_logo.gif'}/>} />
            <SidebarIcon title={''} icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in' alt={'World War Community'} height={0} width={0} src={'/images/servers/wwc_gif_logo.gif'}/>} />
            <SidebarIcon title={''} icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in' alt={'World War Community'} height={0} width={0} src={'/images/servers/wwc_gif_logo.gif'}/>} />
            <SidebarIcon title={''} icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in' alt={'World War Community'} height={0} width={0} src={'/images/servers/wwc_gif_logo.gif'}/>} />
            <SidebarIcon title={''} icon={<Image className='w-2/3 rounded-3xl group-hover:rounded-xl transition-all ease-in' alt={'World War Community'} height={0} width={0} src={'/images/servers/wwc_gif_logo.gif'}/>} />
          </div>
          <div className="flex flex-col gap-4 h-2/10 text-center justify-center items-center">
            <hr className="w-1/3 text-heavily" />
            <ProfileIcon imageUrl={'/images/users/atrih.png'} status={'online'} />
            <SidebarIcon title={'🔔 Notifications'} icon={<FontAwesomeIcon icon={faBell} />} />
            <SidebarIcon title={'⚙️ Settings'} icon={<FontAwesomeIcon icon={faGear} />} />
          </div>
        </aside>
        <main className="w-full h-screen flex flex-row">
          <section className="w-2/10 bg-light h-full flex flex-col text-white">


            <header className='h-1/10 flex flex-col justify-center gap-8 p-6'>
                <div className="flex flex-row justify-between">
                  <h2 className="text-3">Messages</h2>
                  <FontAwesomeIcon icon={faPenToSquare} className="text-blue text-3" />
                </div>
            </header>

            <article className='h-9/10 w-full'>

              <div className="h-9/10 flex flex-col gap-8 text-white pt-[2dvh] px-6">

                <FormInput icon={<FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400" />}  title={'Search'} />

                <MessagesSection icon={<FontAwesomeIcon className="text-blue pr-4" icon={faThumbtack} />} title="Pinned" />

                <MessagesSection icon={<FontAwesomeIcon className="text-blue pr-4" icon={faEnvelope} />} title="Messages" />

              </div>

              <div className="w-full text-center h-1/10 border-t-2 border-blue flex flex-row justify-between px-4">
                <div className="flex flex-row items-center justify-center gap-2">
                  <ProfileIcon imageUrl={'/images/users/atrih.png'} status={'online'} />
                  <div className="flex flex-col justify-between text-start">
                    <span>Mia</span>
                    <span className="text-lightly">#2007</span>
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <SmallIcon icon={<FontAwesomeIcon icon={faMicrophone} />} />
                  <SmallIcon icon={<FontAwesomeIcon icon={faVideo} />} />
                  <SmallIcon icon={<FontAwesomeIcon icon={faHeadphones} />} />
                </div>
              </div>
            </article>

          </section>

          <ChannelMain />

        </main>
      </div>
  );
};

export default Home;
