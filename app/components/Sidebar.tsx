"use client"

import { MdSpaceDashboard } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import Link from "next/link";
function Sidebar() {
  return (
    <div className="h-screen  sm:w-1/4 md:w-1/5 lg:w-1/6 bg-fuchsia-950 text-white py-5 rounded-lg">
      <Link
        href={"/dashboard"}
        className="flex px-2 py-4 hover:text-orange-600 hover:bg-purple-950 rounded-lg"
      >
        <div className="px-2 flex items-center">
          <MdSpaceDashboard />
        </div>
        <p className="hidden sm:block px-6">Dashboard</p>
      </Link>
      <Link
        href={"/premium"}
        className="flex px-2 py-4 hover:text-orange-600 hover:bg-purple-950 rounded-lg text-yellow-500"
      >
        <div className="animate-bounce px-2 flex items-center">
          <MdAttachMoney />
        </div>

        <p className="hidden sm:block px-6">Buy Premium</p>
      </Link>
      <Link
        href={"/more"}
        className="flex px-2 py-4 hover:text-orange-600 hover:bg-purple-950 rounded-lg"
      >
        <div className="px-2 flex items-center">
          <CiCircleMore />
        </div>

        <p className="hidden sm:block px-6">More</p>
      </Link>
    </div>
  );
}

export default Sidebar;
