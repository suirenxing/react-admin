import { useState } from "react";

type callback = (data: any) => void;
export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (open: boolean, data: any) => {
    const setData = (record = data) => {
      setIsOpen(open);
    };
    onOpenModal(setData);
  };
  const onOpenModal = (callback: callback) => {
    callback(isOpen);
  };
  return {
    isOpen,
    setIsOpen,
    onOpenModal,
  };
}
