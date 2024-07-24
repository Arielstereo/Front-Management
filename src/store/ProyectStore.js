import { create } from "zustand";
import {persist} from 'zustand/middleware'

const useProyectStore = create(
  persist(
    (set) => ({
      proyects: [],
      proyect: {},
      setProyects: (proyects) => set(() => ({ proyects })),
      setProyect: (proyect) => set(() => ({proyect}))
    }),
    {
      name: 'proyect-store'
    }
  )
);

export default useProyectStore;