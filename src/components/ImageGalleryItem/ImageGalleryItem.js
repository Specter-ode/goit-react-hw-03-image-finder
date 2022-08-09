import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => {
  const { id, webformatURL, tags, onClickImage } = props;

  return (
    <li className={s.imageGalleryItem} key={id}>
      <img
        className={s.imageGalleryItem__image}
        src={webformatURL}
        alt={tags}
        onClick={() => onClickImage(id)}
      />
    </li>
  );
};

export default ImageGalleryItem;
