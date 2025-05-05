import { useState } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpened, setOpened] = useState(true);

  return (
    <div>
      <div className="flex flex-row ...">
        <Sidebar isOpened={isOpened} toggleDrawer={() => {}} />

        <div className="w-full">{children}</div>
      </div>

      <Footer />
    </div>
  );
}
