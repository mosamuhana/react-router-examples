import { forwardRef } from 'react';
import { DialogContent } from '@reach/dialog';

import { Image } from '../types';

type Props = {
  image: Image;
  onDismiss: () => void;
};

export const ImageDialogContent = forwardRef<HTMLButtonElement, Props>(
  function ImageDialogContent({ image, onDismiss }, ref) {
    return (
      <DialogContent className="image-dialog-content">
        <h1 id="label">{image.title}</h1>
        <img width={400} height={400} src={image.src} alt={image.title} />
        <button ref={ref} onClick={onDismiss}>Close</button>
      </DialogContent>
    );
  }
);
