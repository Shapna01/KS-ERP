"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutGrid,
  Users,
  FolderKanban,
  ShoppingCart,
  Boxes,
  Wallet,
  Receipt,
  ShieldCheck,
  CheckSquare,
  Store,
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
    icon: <FolderKanban size={18} />,
    path: "/dashboard/projects",
  },
  {
    icon: <ShoppingCart size={18} />,
    path: "/dashboard/procurement",
  },
  {
    icon: <Store size={18} />,
    path: "/dashboard/procurement/vendors",
  },
  {
    icon: <Wallet size={18} />,
    path: "/dashboard/finance/reimbursement",
  },
  {
    icon: <Receipt size={18} />,
    path: "/dashboard/finance/account-payable",
  },
  {
    icon: <ShieldCheck size={18} />,
    path: "/dashboard/roles-permissions",
  },
  {
    icon: <CheckSquare size={18} />,
    path: "/dashboard/approvals",
  },
];
  return (

    <div className="fixed left-0 top-0 w-[74px] h-screen bg-gradient-to-b from-[#4B0055] to-[#7A008C] flex flex-col items-center z-50">

      <div className="w-full h-[72px] border-b border-purple-800 flex items-center justify-center">

        <img
        src="/images/front.png"
        alt="logo"
        className="w-13 h-13 object-contain"
        />
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
                className={`w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all
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
