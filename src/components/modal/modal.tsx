import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';

const MODAL_ROOT_ID = 'modals'; 
const modalContainer = document.getElementById(MODAL_ROOT_ID); 

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { 
      if (event.key === 'Escape') { 
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown); 
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose}>
      {children}
    </ModalUI>,
    modalContainer as HTMLDivElement 
  );
});