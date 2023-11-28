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
  faMicrophone, faVideo, faHeadphones, faBell, faGear
} from "@fortawesome/free-solid-svg-icons";
import MessageLink from "@/app/components/MessageLink";
import MessagesSection from "@/app/components/MessagesSection";

interface HomeProps {
  // Add any specific props for the Home component here
}

const Home: React.FC<HomeProps> = () => {
  return (
      <div className="w-screen h-screen overflow-hidden flex flex-row">
        <aside className="w-0.5/10 h-screen flex flex-col py-4 bg-heavy text-white text-4">
          <div className="flex flex-col gap-2 h-2/10 text-center justify-center items-center">
            <div><FontAwesomeIcon icon={faDiscord} className="hover:text-green-600" /></div>
            <hr className="w-1/3 text-heavily" />
            <div><FontAwesomeIcon icon={faInbox} /></div>
            <div><FontAwesomeIcon icon={faUsers} /></div>
            <hr className="w-1/3 text-heavily" />
          </div>
          <div className="flex flex-col gap-2 h-6/10 text-center pt-4">
            <div>S1</div>
            <div>S1</div>
            <div>S1</div>
            <div>S1</div>
          </div>
          <div className="flex flex-col gap-2 h-2/10 text-center justify-center items-center">
            <div><img className="w-[3dvw] rounded-full" src="https://openseauserdata.com/files/3085b3fc65f00b28699b43efb4434eec.png" alt="profile picture" /><div className="group-hover:border-blue relative bottom-6 left-10 border-2 border-light bg-green-500 h-6 w-6 text-lg rounded-full text-white"></div></div>
            <div><FontAwesomeIcon icon={faBell} /></div>
            <div><FontAwesomeIcon icon={faGear} /></div>
          </div>
        </aside>
        <main className="w-full h-screen flex flex-row">
          <section className="w-2/10 bg-light h-full flex flex-col text-white">
            <div className="h-2/10 flex flex-col justify-center gap-8 p-6">
              <div className="flex flex-row justify-between">
                <h2 className="text-3">Messages</h2>
                <FontAwesomeIcon icon={faPenToSquare} className="text-blue text-4" />
              </div>

              <div className="relative">
                <input type="text" className="pl-10 pr-4 py-2 border rounded-lg bg-gray border-none w-full" placeholder="Search" />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-gray rounded-lg">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400" />
                  </div>
              </div>
            </div>

            <div className="h-8/10 flex flex-col gap-8 text-white p-6">

              <MessagesSection icon={<FontAwesomeIcon className="text-blue pr-4" icon={faThumbtack} />} title="Pinned" />

              <MessagesSection icon={<FontAwesomeIcon className="text-blue pr-4" icon={faEnvelope} />} title="Messages" />

            </div>

            <div className="w-full text-center h-1/10 border-t-2 border-blue flex flex-row justify-between px-4">
              <div className="flex flex-row items-center justify-center gap-2">
                <img className="w-[3dvw] rounded-full" src="https://openseauserdata.com/files/3085b3fc65f00b28699b43efb4434eec.png" alt="profile picture" />
                <div className="flex flex-col justify-between text-start">
                  <span>Mia</span>
                  <span className="text-lightly">#2007</span>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <div><FontAwesomeIcon icon={faMicrophone} className="text-2 text-lightly" /></div>
                <div><FontAwesomeIcon icon={faVideo} className="text-2 text-lightly" /></div>
                <div><FontAwesomeIcon icon={faHeadphones} className="text-2 text-lightly" /></div>
              </div>
            </div>

          </section>

          <section className="w-8/10 bg-gray h-full">

          </section>
        </main>
      </div>
  );
};

export default Home;
