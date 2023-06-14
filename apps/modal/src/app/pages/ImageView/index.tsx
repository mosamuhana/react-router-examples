import { useImageById } from '../../utils';

export function Component() {
  const image = useImageById();

  if (!image) return <div>Image not found</div>;

  return (
    <div>
      <h1>{image.title}</h1>
      <img width={400} height={400} src={image.src} alt="" />
    </div>
  );
}

Component.displayName = 'ImageViewPage';

export default Component;
