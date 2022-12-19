import React from "react";
// import PropTypes from 'prop-types'
import css from "../ImageGallery/ImageGallery.module.css"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export class ImageGallery extends React.Component {

  render() {
    const {images, toggleModal, setModalImage} = this.props
    return (
      <>        
        {(images.length > 0) && (
          <ul className={css.imageGallery}>
            <ImageGalleryItem images={images} toggleModal={toggleModal} setModalImage={setModalImage} /> 
          </ul>
        )}
      </>
      )
  }  
}

