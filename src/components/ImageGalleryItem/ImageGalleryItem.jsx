import PropTypes from 'prop-types'
import css from "../ImageGalleryItem/ImageGalleryItem.module.css"

export const ImageGalleryItem = ({ webformatURL, largeImageURL, setModalImage, toggleModal }) => {

  return (
  <>
    <li className={css.imageGalleryItem}>
      <img src={webformatURL} alt="query" className={css.imageGalleryItemImage} onClick={() => { setModalImage(largeImageURL); toggleModal(); }} />
    </li>
  </>
  )
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setModalImage: PropTypes.func.isRequired,
}