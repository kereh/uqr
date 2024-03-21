"use client";

import { useDokumenStore } from "@/stores/dokumenStore";
import { useToast } from "@/components/ui/use-toast";
import { useTtdStore } from "@/stores/ttdStore";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { urltoFile } from "@/lib/img";
import { useState } from "react";
import html2canvas from "html2canvas";

import NullNN from "@/components/null-nn";
import TTD from "@/components/ttd";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const { nama, nomor } = useDokumenStore();
  const { edgestore } = useEdgeStore();
  const { url, updateQrUrl } = useTtdStore();
  const { toast } = useToast();

  if (!nama || !nomor) return <NullNN />;

  const submitHandler = () => {
    setLoading(true);

    html2canvas(document.querySelector("#qr") as any).then(
      async (canvas: any) => {
        const canvasData = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `QR_${nomor}_${nama}.png`;
        downloadLink.href = canvasData;
        downloadLink.click();

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
          description: "Kode QR Berhasil disimpan",
        });
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 md:gap-10 justify-center items-center">
      <TTD />
      <Button onClick={submitHandler} disabled={loading}>
        Buat Kode QR dan Simpan
      </Button>
    </div>
  );
}
