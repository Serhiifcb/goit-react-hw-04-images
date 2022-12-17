// import PropTypes from 'prop-types'
import css from "../ImageGalleryItem/ImageGalleryItem.module.css"

export const ImageGalleryItem = ({ images, setModalImage, toggleModal }) => {

  return (
  <>
    {images.map(image => (
      <li key={image.id} className={css.imageGalleryItem}>
        <img src={image.webformatURL} alt="query" className={css.imageGalleryItemImage} onClick={() => { setModalImage(image.largeImageURL); toggleModal(); }} />
      </li>
    ))}
      
  </>
  )
}