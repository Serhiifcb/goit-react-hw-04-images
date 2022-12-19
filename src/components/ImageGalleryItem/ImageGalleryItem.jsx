import PropTypes from 'prop-types'
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

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired
    })
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
  setModalImage: PropTypes.func.isRequired,
}