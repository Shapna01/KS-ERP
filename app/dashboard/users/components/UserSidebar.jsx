"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserSidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Employee List",
      path: "/dashboard/users",
    },
    {
      name: "Organisation Hierarchy",
      path: "/dashboard/users/organisation-hierarchy",
    },
    {
      name: "Teams",
      path: "/dashboard/users/teams",
    },
    {
      name: "Departments",
      path: "/dashboard/users/departments",
    },
    {
      name: "Designations",
      path: "/dashboard/users/designations",
    },
  ];
  
  return (
    <div className="fixed top-[72px] left-[74px] w-[250px] h-[calc(100vh-72px)] bg-white border-r border-[#EAECF0] overflow-y-auto">
      <div className="px-8 py-7 border-b">
        <h1 className="text-[24px] text-black font-semibold">
          Users
        </h1>
      </div>

      <div className="pt-3">
        {menus.map((menu) => {
          const active = pathname === menu.path;

          return (
            <Link key={menu.path} href={menu.path}>
              <div
                className={`relative h-[54px] flex items-center px-8 text-[14px] cursor-pointer
                ${
                  active
                    ? "bg-[#FDF2FA] text-[#101828] font-medium"
                    : "text-[#667085] hover:bg-[#F9FAFB]"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-0 h-full w-[4px] bg-[#C11574]" />
                )}

                {menu.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}