import { useParams } from 'react-router-dom';

import { IMAGES } from './images';
import { Image } from './types';

export const getImageById = (id: number) => IMAGES.find(x => x.id === id);

export function useImageById(): Image | null {
  const { id } = useParams<'id'>();
  if (!id) return null;
  const image = getImageById(Number(id));
  if (!image) return null;
  return image;
}
