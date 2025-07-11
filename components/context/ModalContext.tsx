"use client";
import React, { createContext, useContext, useState } from "react";

interface ModalValue {
  modalState: { state: boolean; type: string  , value?: Record<string , unknown>};
  handleModal: (type: string , modalVal?: null | Record<string , unknown>) => void;
}
const ModalContext = createContext<ModalValue | undefined>(undefined);
export const modalClass = 'text-black p-5 min-w-full min-h-[80%] flex flex-col lg:min-w-[50%]'
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState({ state: false, type: "" , value: {} });
  function handleModal(type?: string , modalVal: null | Record<string , unknown> = null) {
    console.log('triggered');
    
    setModalState((prev) => ({ state: !prev.state, type: type ? type : prev.type , value: modalVal ? modalVal : {}}));
  }
  return (
    <ModalContext.Provider value={{ modalState, handleModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = (): ModalValue => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("No context");
  return context;
};
