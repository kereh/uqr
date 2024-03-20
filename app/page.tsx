"use client";

import { useDokumenStore } from "@/stores/dokumenStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Page() {
  const { nama, nomor, ubahNama, ubahNomor } = useDokumenStore();
  const { push } = useRouter();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nama.length === 0 || nomor.length === 0) {
      return alert("Form harus diisi");
    }

    return push("/generate");
  };

  return (
    <div className="grid place-content-center h-[75vh] md:h-screen">
      <div className="w-full md:max-w-md">
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <div className="space-y-3">
            <label>Nomor Dokumen</label>
            <Input value={nomor} onChange={(e) => ubahNomor(e.target.value)} />
          </div>
          <div className="space-y-3">
            <label>Nama Dokumen</label>
            <Input value={nama} onChange={(e) => ubahNama(e.target.value)} />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
