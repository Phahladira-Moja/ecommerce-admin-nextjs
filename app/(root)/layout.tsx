import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import React from "react";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  // checking if the user has created a store if not, show modal.
  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
}
