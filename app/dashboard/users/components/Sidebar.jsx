"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutGrid,
  Users,
  GitBranch,
  Boxes,
  Briefcase,
  BadgeHelp,
  FileText,
  Search,
} from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname();

  const menuItems = [
    {
      icon: <LayoutGrid size={18} />,
      path: "/dashboard",
    },
    {
      icon: <Users size={18} />,
      path: "/dashboard/users",
    },
    {
      icon: <GitBranch size={18} />,
      path: "/dashboard/organisation",
    },
    {
      icon: <Boxes size={18} />,
      path: "/dashboard/team",
    },
    {
      icon: <Briefcase size={18} />,
      path: "/dashboard/department",
    },
    {
      icon: <BadgeHelp size={18} />,
      path: "/dashboard/designation",
    },
    {
      icon: <FileText size={18} />,
      path: "/dashboard/reports",
    },
    {
      icon: <Search size={18} />,
      path: "/dashboard/search",
    },
  ];

  return (

    <div className="w-[74px] min-h-screen bg-gradient-to-b from-[#4B0055] to-[#7A008C] flex flex-col items-center">

      <div className="w-full h-[72px] border-b border-purple-800 flex items-center justify-center">

        <div className="relative w-10 h-10">

          <div className="absolute w-4 h-4 bg-pink-500 rotate-45 left-0 top-1 rounded-sm"></div>

          <div className="absolute w-4 h-4 bg-cyan-400 rotate-45 right-0 top-1 rounded-sm"></div>

          <div className="absolute w-4 h-4 bg-fuchsia-600 rotate-45 left-0 bottom-1 rounded-sm"></div>

          <div className="absolute w-4 h-4 bg-blue-500 rotate-45 right-0 bottom-1 rounded-sm"></div>

        </div>

      </div>

      <div className="flex flex-col items-center gap-5 mt-6">

        {menuItems.map((item, index) => {

          const isActive =
            pathname === item.path ||
            pathname.startsWith(item.path + "/");

          return (

            <Link
              href={item.path}
              key={index}
            >

              <div
                className={`
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  transition-all
                  ${
                    isActive
                      ? "bg-fuchsia-600 text-white shadow-lg"
                      : "text-white/80 hover:bg-purple-800"
                  }
                `}
              >

                {item.icon}

              </div>

            </Link>
          );
        })}

      </div>

      <div className="mt-auto mb-4 w-10 h-[3px] rounded-full bg-white/40"></div>

    </div>
  );
}
