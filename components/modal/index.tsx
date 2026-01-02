import { motion, AnimatePresence, Variants } from "framer-motion";
import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  shouldCloseOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  title?: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  overlayClassName = "",
  shouldCloseOnOverlayClick = true,
  showCloseButton = true,
  title,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-9998 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto ${overlayClassName}`}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={shouldCloseOnOverlayClick ? onClose : undefined}
        >
          {/* Modal content */}
          <motion.div
            className={`relative bg-background rounded-3xl shadow-2xl w-full max-w-4xl mt-10 mb-10 ${className}`}
            style={{ maxHeight: "calc(100vh - 5rem)", overflowY: "auto" }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // prevent overlay close
          >
            <div className="flex items-center justify-between p-6 ">
              {title && (
                <h2 className="text-xl font-semibold text-gray-900 ">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600  transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#B9B9B9"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>{" "}
                </button>
              )}
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
