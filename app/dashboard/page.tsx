"use client";
import UnderConstruction from "../components/main/UnderConstruction";
import PageTitle from "../components/main/PageTitle";
import usePageTitle from "../hooks/usePageTitle";
import { useSocket } from "../config/state-config/SocketContext";

const Dashboard = () => {
  usePageTitle("داشبورد");

  return (
    <main className="flex flex-col gap-4">
      <PageTitle name={"داشبورد"} />
      <div className="w-full">
        <UnderConstruction desc="در این داشبورد تمامی چارت ها و گزارشات آماری بر اساس اطلاعات موجود در پلتفرم نمایش داده خواهد شد." />
      </div>
    </main>
  );
};

export default Dashboard;
