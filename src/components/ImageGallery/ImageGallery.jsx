import React from "react";
import PropTypes from 'prop-types'
import css from "../ImageGallery/ImageGallery.module.css"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Modal } from "components/Modal/Modal";
import { Button } from "components/Button/Button";
import { toast } from "react-toastify";
import { Circles } from  'react-loader-spinner'

export class ImageGallery extends React.Component {

  state = {
    page: 1,
    images: [],
    showModal: false,
    modalImage: '',
    loading: false,
    error: null,
    totalHits: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchImageText !== this.props.searchImageText || prevState.page !== this.state.page) {
      console.log(prevProps.searchImageText);
      console.log(this.props.searchImageText);
      console.log(prevState.page);
      console.log(this.state.page);
      console.log("Виконано перше порівняння");
      if (prevProps.searchImageText !== this.props.searchImageText) {
        console.log('Друга перевірка');
        this.setState({
          page: 1,
          images: [],
        })
      }
      this.setState({
        loading: true,
        error: null,
      })
      
      // setTimeout(() => {
        console.log("Фетч");
        fetch(`https://pixabay.com/api/?q=${this.props.searchImageText}&page=${this.state.page}&key=30577922-67600fce07e41f9eca16e67a5&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => { 
            if (response.ok) {
              return response.json();
            }
            return toast.error('Щось пішло не так. Немає відповіді на Ваш пошуковий запит...');
          })
          .then(res => {
            this.setState(prevState => ({
              images: [...prevState.images, ...res.hits],  
              totalHits: res.totalHits
            }))
            if (res.totalHits === 0) {
              return toast.error('По Вашому запиту не знайдено жодної картинки!');
            } 
          })
          .catch(error => this.setState({ error }))
        .finally(() => this.setState({loading: false}));
      // }, 1000)
    }
  }

  toggleModal = () => {
    console.log('Тогл модалки');
    this.setState(state => ({
      showModal: !state.showModal,
    }))
  }

  setModalImage = (modalImage) => {
    console.log('setModalImage');
    this.setState(state => ({
      modalImage,
    }))
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  render() {
    const { loading, images, showModal, error } = this.state;
    return (
      <>  
        {error && <h2 className={css.errorMessage}>Щось пішло не так. Немає відповіді на Ваш пошуковий запит</h2>}
        {loading && <Circles
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="circles-loading"
          wrapperClass={css.loading}
          visible={true}
        />}  
        {(images.length > 0) && (
          <ul className={css.imageGallery}>
            <ImageGalleryItem images={this.state.images} toggleModal={this.toggleModal} setModalImage={this.setModalImage} /> 
          </ul>
        )}
        {(images.length > 0) && <Button
          loadMore={this.loadMore}
        />}
        {showModal && <Modal toggleModal={this.toggleModal}><img src={this.state.modalImage} alt="image" /></Modal>}
      </>
      )
  }  
  
}

