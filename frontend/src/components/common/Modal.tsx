import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-backdrop" onClick={onClose}>
                    <motion.div
                        className="modal-container"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="glass-card-modal">
                            <button className="close-btn" onClick={onClose}>
                                <X size={24} />
                            </button>

                            <h2 style={{
                                fontSize: '1.8rem',
                                marginBottom: '10px',
                                color: 'var(--primary)',
                                fontWeight: 700
                            }}>
                                {title}
                            </h2>
                            <p style={{ marginBottom: '30px', fontSize: '0.9rem' }}>
                                Fill in the details below to add a new product.
                            </p>

                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
