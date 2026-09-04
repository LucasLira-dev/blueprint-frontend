'use client';

import { AdminPage } from "@/components/admin/AdminPage";
import { Loading } from "@/components/Loading";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPageRoute() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session?.user?.role !== "admin") {
      router.replace("/");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <Loading />
    );
  }

  if (session?.user?.role !== "admin") {
    return null;
  }

  return (
    <section className="flex justify-center">
      <AdminPage />
    </section>
  );
}