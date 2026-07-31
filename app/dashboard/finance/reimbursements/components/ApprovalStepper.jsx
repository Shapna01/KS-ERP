"use client";

export default function ApprovalStepper() {
  return (
    <div className="flex mb-10">

      <div className="relative flex-1 h-11 bg-[#F7D8F4] rounded-l-md flex items-center justify-center text-sm font-semibold text-[#A000A9]">

        Approval Lvl 1

        <div className="absolute right-[-22px] top-0 w-0 h-0 border-t-[22px] border-b-[22px] border-l-[22px] border-t-transparent border-b-transparent border-l-[#F7D8F4]" />

      </div>

      <div className="relative flex-1 h-11 bg-[#D9D9D9] flex items-center justify-center text-sm font-semibold text-[#555]">

        Approval Lvl 2

        <div className="absolute right-[-22px] top-0 w-0 h-0 border-t-[22px] border-b-[22px] border-l-[22px] border-t-transparent border-b-transparent border-l-[#D9D9D9]" />

      </div>

      <div className="flex-1 h-11 bg-[#F7D8F4] rounded-r-md flex items-center justify-center text-sm font-semibold text-[#A000A9]">

        Approval Lvl 3 (Approved)

      </div>

    </div>
  );
}