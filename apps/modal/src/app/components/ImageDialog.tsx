import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DialogOverlay } from '@reach/dialog';

import { useImageById } from '../utils';
import { ImageDialogContent } from './ImageDialogContent';

export function ImageDialog() {
  const navigate = useNavigate();
  const image = useImageById();
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const onDismiss = () => navigate(-1);

  if (!image) return null;

  return (
    <DialogOverlay
      aria-labelledby="label"
      onDismiss={onDismiss}
      initialFocusRef={initialFocusRef}
    >
      <ImageDialogContent
        ref={initialFocusRef}
        image={image}
        onDismiss={onDismiss}
      />
    </DialogOverlay>
  );
}
