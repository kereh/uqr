"use client";

import { useEffect, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { useTtdStore } from "@/stores/ttdStore";
import { useDokumenStore } from "@/stores/dokumenStore";
import html2canvas from "html2canvas";

export default function TTD() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { nomor, nama } = useDokumenStore();
  const { qrUrl, updateUrl } = useTtdStore();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const buatTTD = async () => {
      const img = new Image();
      img.src = "/ttd.png";
      await img.decode();
      const centerX = canvas.width / 2;
      const date = new Date();
      const localTime = date.toLocaleString("id-ID", {
        timeZone: "Asia/Makassar",
      });
      ctx.drawImage(img, 0, 0);
      // nomor dokumen
      ctx.font = "25px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "blue";
      ctx.fillText(nomor, centerX, 350);
      // nama dokumen
      ctx.font = "25px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "blue";
      ctx.fillText(nama, centerX, 440);
      // waktu dokumen
      ctx.font = "25px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "blue";
      ctx.fillText(localTime, centerX, 650);
      // update url state
      updateUrl(canvasRef.current?.toDataURL("image/png"));
    };

    buatTTD();
  }, []);

  const simpanQr = async () => {
    if (!qrUrl) return;
    html2canvas(document.querySelector("#qr") as any).then(
      async (canvas: any) => {
        const canvasData = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `QR_${nomor}_${nama}.png`;
        downloadLink.href = canvasData;
        downloadLink.click();
      }
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-3">
        <h1 className="text-center">TTD</h1>
        <canvas
          ref={canvasRef}
          width={1200}
          height={800}
          className="w-full md:max-w-xl"
        />
      </div>
      <div
        className="place-self-center text-center space-y-3"
        onClick={simpanQr}
      >
        <h1 className="text-center">QRCode</h1>
        <QRCode
          value={qrUrl}
          fgColor="blue"
          logoImage="/logo-qr.png"
          logoWidth={75}
          logoHeight={75}
          quietZone={15}
          size={313}
          qrStyle="dots"
          id="qr"
          enableCORS={true}
          eyeRadius={[
            [10, 10, 0, 10],
            [10, 10, 10, 0],
            [10, 0, 10, 10],
          ]}
        />
        {!qrUrl ? (
          <p className="text-sm text-center text-red-600">*Kode QR Invalid</p>
        ) : (
          <p className="text-sm text-center text-green-600">
            *Kode QR Valid, click Kode QR untuk Menyimpan
          </p>
        )}
      </div>
    </div>
  );
}
