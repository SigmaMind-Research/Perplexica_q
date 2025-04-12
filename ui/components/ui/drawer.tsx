import React, { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;  // Explicitly typing 'children' as ReactNode
}

const Drawer: React.FC<DrawerProps> = ({ open, onOpenChange, children }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-[400px] bg-zinc-900 text-white shadow-lg z-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold">All Sources</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>
          <div className="space-y-4">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Drawer;
