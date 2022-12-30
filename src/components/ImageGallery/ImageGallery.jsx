import React from "react";
import PropTypes from 'prop-types'
import css from "../ImageGallery/ImageGallery.module.css"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({images, toggleModal, setModalImage}) => {
  return (
      <>        
        {(images.length > 0) && (
          <ul className={css.imageGallery}>
            {images.map(image => (
              <ImageGalleryItem key={image.id} webformatURL={image.webformatURL} largeImageURL={image.largeImageURL} toggleModal={toggleModal} setModalImage={setModalImage} />
            ))}  
          </ul>
        )}
      </>
      )
} 

// export class ImageGallery extends React.Component {

//   render() {
//     const {images, toggleModal, setModalImage} = this.props
//     return (
//       <>        
//         {(images.length > 0) && (
//           <ul className={css.imageGallery}>
//             {images.map(image => (
//               <ImageGalleryItem key={image.id} webformatURL={image.webformatURL} largeImageURL={image.largeImageURL} toggleModal={toggleModal} setModalImage={setModalImage} />
//             ))}  
//           </ul>
//         )}
//       </>
//       )
//   }  
// }

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired
    })).isRequired,
  toggleModal: PropTypes.func.isRequired,
  setModalImage: PropTypes.func.isRequired,
}
