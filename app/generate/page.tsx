"use client";

import { useDokumenStore } from "@/stores/dokumenStore";
import { useToast } from "@/components/ui/use-toast";
import { useTtdStore } from "@/stores/ttdStore";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
import { urltoFile } from "@/lib/img";
import { useState } from "react";

import NullNN from "@/components/null-nn";
import TTD from "@/components/ttd";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const { nama, nomor, ubahNama, ubahNomor } = useDokumenStore();
  const { url, qrUrl, updateQrUrl } = useTtdStore();
  const { edgestore } = useEdgeStore();
  const { push } = useRouter();
  const { toast } = useToast();

  if (!nama || !nomor) return <NullNN />;

  const submitHandler = async () => {
    setLoading(true);
    const file = await urltoFile(url, `${nomor}_${nama}.png`, "image/png");
    const ttd = await edgestore.publicFiles.upload({
      file: file,
      onProgressChange: (progress) => {
        if (progress === 100) {
          setLoading(false);
        }
      },
    });
    updateQrUrl(ttd.url);
    toast({
      title: "Berhasil",
      description: "TTD Digital Berhasil disimpan",
    });
  };

  const kembali = () => {
    ubahNama("");
    ubahNomor("");
    push("/");
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <TTD />
      {!qrUrl ? (
        <Button onClick={submitHandler} disabled={loading}>
          Upload TTD Digital
        </Button>
      ) : (
        <Button variant="secondary" onClick={kembali}>
          Kembali
        </Button>
      )}
    </div>
  );
}
