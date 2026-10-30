import { createContext, useContext, useState, type ReactNode } from 'react';

interface ModalContextValue {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('Modal.* phải nằm bên trong <Modal>');
  return ctx;
}

export function Modal({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>;
}

Modal.Trigger = function Trigger({ children }: { children: ReactNode }) {
  const { setOpen } = useModal();
  return <span onClick={() => setOpen(true)}>{children}</span>;
};

Modal.Content = function Content({ children }: { children: ReactNode }) {
  const { open } = useModal();
  if (!open) return null;
  return (
    <div className="overlay">
      <div className="modal">{children}</div>
    </div>
  );
};

Modal.Close = function Close({ children }: { children: ReactNode }) {
  const { setOpen } = useModal();
  return <span onClick={() => setOpen(false)}>{children}</span>;
};
