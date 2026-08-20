"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardIndex() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user) {
      const role = (session.user as any).role?.toLowerCase() || "citizen";
      router.push(`/dashboard/${role}`);
    }
  }, [status, session, router]);

  return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>;
}
