import { DashboardLayoutWrapper } from "@/components/admin/DashboardLayoutWrapper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutWrapper>
      {children}
    </DashboardLayoutWrapper>
  );
}
