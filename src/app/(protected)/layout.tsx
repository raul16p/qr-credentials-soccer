// "use client";

import { UserButton } from "@/components/auth/user-button";
import UserNavBar from "@/components/navbar/user-navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
      <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
        <div className="flex gap-x-2">
          {/** Inside server components, we are able to render client components */}
          <UserNavBar />
        </div>
        {/**
         * If this component were client-side, then <UserButton/>
         * couldn't be rendered because it is server-side
         */}
        <UserButton />
      </nav>
      {children}
    </div>
  );
};

export default ProtectedLayout;
