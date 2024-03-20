import { create } from "zustand";

type State = {
  nomor: string;
  nama: string;
};

type Action = {
  ubahNomor: (nomor: State["nomor"]) => void;
  ubahNama: (nomor: State["nama"]) => void;
};

export const useDokumenStore = create<State & Action>((set) => ({
  nomor: "",
  nama: "",
  ubahNomor: (nomor) => set({ nomor: nomor }),
  ubahNama: (nama) => set({ nama: nama }),
}));
