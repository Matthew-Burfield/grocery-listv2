import { Outlet } from "remix";
import FloatingQuickAddMenu from "~/components/FloatingQuickAddMenu";

export default function Portal() {
  return (
    <main className="relative min-h-screen bg-white">
      <Outlet />
      <FloatingQuickAddMenu />
    </main>
  );
}
