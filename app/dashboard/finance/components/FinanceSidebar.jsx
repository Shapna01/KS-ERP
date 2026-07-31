"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FinanceSidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Reimbursement",
      path: "/dashboard/finance/reimbursement",
    },
    {
      name: "Account Payable",
      path: "/dashboard/finance/account-payable",
    },
  ];

  return (
    <div className="fixed top-[72px] left-[74px] w-[250px] h-[calc(100vh-72px)] bg-white border-r border-[#EAECF0]">
      <div className="px-8 py-7 border-b">
        <h1 className="text-2xl font-semibold">Finance</h1>
      </div>

      <div className="pt-3">
        {menus.map((menu) => {
          const active =
            pathname === menu.path ||
            pathname.startsWith(menu.path + "/");

          return (
            <Link key={menu.path} href={menu.path}>
              <div
                className={`relative h-[54px] flex items-center px-8 ${
                  active
                    ? "bg-[#FDF2FA] font-medium"
                    : "hover:bg-gray-50 text-gray-500"
                }`}
              >
                {active && (
                  <div className="absolute left-0 w-1 h-full bg-[#C11574]" />
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