import { create } from "zustand";

type State = {
  url: any;
  qrUrl: string;
};

type Action = {
  updateUrl: (url: State["url"]) => void;
  updateQrUrl: (qrUrl: State["qrUrl"]) => void;
};

export const useTtdStore = create<State & Action>((set) => ({
  url: "",
  qrUrl: "",
  updateUrl: (url) => set({ url: url }),
  updateQrUrl: (qrUrl) => set({ qrUrl: qrUrl }),
}));
