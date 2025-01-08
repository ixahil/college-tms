import { ReactNode } from "react";

const AgentAuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen gap-8 items-center justify-center">
      <div className="">
        <h1 className="text-3xl font-bold">TMS</h1>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default AgentAuthLayout;
