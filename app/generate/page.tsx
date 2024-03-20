"use client";

import { useDokumenStore } from "@/stores/dokumenStore";
import NullNN from "@/components/null-nn";

export default function Page() {
  const { nama, nomor } = useDokumenStore();

  if (!nama || !nomor) return <NullNN />;

  return <div>generate page</div>;
}
