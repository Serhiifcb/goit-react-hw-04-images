import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { toast } from "react-toastify";
import { Circles } from 'react-loader-spinner'
import css from './App.module.css'
import { Modal } from "components/Modal/Modal";
import { Button } from "components/Button/Button";
import { useState } from "react";
import { useEffect } from "react";

export const App = () => {
  
  const [searchImageText, setSearchImageText] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState('');
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [hits, setHits] = useState(0);

  const formSubmitHandler = searchText => {
    if (searchImageText !== searchText) {
      setSearchImageText(searchText);
      setPage(1);
      setImages([]);
      setHits(0);
      };
  }
  
  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  }

  const setModalImage = (image) => {
    setBigImage(image);
  }

  const loadMore = () => {
    setPage(prevState => prevState + 1)
  }

  useEffect(() => {
    if (searchImageText) {
      setLoading(true);
      setError(null);
      fetch(`https://pixabay.com/api/?q=${searchImageText}&page=${page}&key=30577922-67600fce07e41f9eca16e67a5&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return toast.error('Щось пішло не так. Немає відповіді на Ваш пошуковий запит...');
        })
        .then(res => {
          setImages(prevState => [...prevState, ...res.hits]);
          setTotalHits(res.totalHits);
          setHits(prevState => prevState + res.hits.length)
          if (res.totalHits === 0) {
            return toast.error('По Вашому запиту не знайдено жодної картинки!');
          }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [searchImageText, page])

  return (
    <div>
      {error && <h2 className={css.errorMessage}>Щось пішло не так. Немає відповіді на Ваш пошуковий запит</h2>}
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery images={images} toggleModal={toggleModal} setModalImage={setModalImage} />
      {showModal && <Modal toggleModal={toggleModal}><img src={bigImage} alt="modal" /></Modal>}
      {(images.length > 0) && ((totalHits - hits) > 0) && <Button
          loadMore={loadMore}
        />}
      <ToastContainer autoClose={6000} />
      {loading && <Circles
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="circles-loading"
          wrapperClass={css.loading}
          visible={true}
        />}
    </div>
    );
}
  
// export class App extends React.Component {

//   state = {
//     searchImageText: '',
//     page: 1,
//     images: [],
//     showModal: false,
//     modalImage: '',
//     loading: false,
//     error: null,
//     totalHits: null
//   }

//   formSubmitHandler = searchImageText => {
//     if (this.state.searchImageText !== searchImageText) {
//       this.setState({
//         searchImageText,
//         page: 1,
//         images: [],
//       });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {

//     if (prevState.searchImageText !== this.state.searchImageText || prevState.page !== this.state.page) {
//       this.setState({
//         loading: true,
//         error: null,
//       })
        
//       fetch(`https://pixabay.com/api/?q=${this.state.searchImageText}&page=${this.state.page}&key=30577922-67600fce07e41f9eca16e67a5&image_type=photo&orientation=horizontal&per_page=12`)
//           .then(response => { 
//             if (response.ok) {
//               return response.json();
//             }
//             return toast.error('Щось пішло не так. Немає відповіді на Ваш пошуковий запит...');
//           })
//           .then(res => {
//             this.setState(prevState => ({
//               images: [...prevState.images, ...res.hits],  
//               totalHits: res.totalHits
//             }))
//             if (res.totalHits === 0) {
//               return toast.error('По Вашому запиту не знайдено жодної картинки!');
//             } 
//           })
//           .catch(error => this.setState({ error }))
//         .finally(() => this.setState({loading: false}));
//     }
//   }

//   toggleModal = () => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//     }))
//   }

//   setModalImage = (modalImage) => {
//     this.setState(state => ({
//       modalImage,
//     }))
//   }

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }))
//   }

//   render() {
//     const { loading, images, showModal, error, modalImage } = this.state;
//   return (
//     <div>
//       {error && <h2 className={css.errorMessage}>Щось пішло не так. Немає відповіді на Ваш пошуковий запит</h2>}
//       <Searchbar onSubmit={this.formSubmitHandler} />
//       <ImageGallery images={images} toggleModal={this.toggleModal} setModalImage={this.setModalImage} />
//       {showModal && <Modal toggleModal={this.toggleModal}><img src={modalImage} alt="modal" /></Modal>}
//       {(images.length > 0) && <Button
//           loadMore={this.loadMore}
//         />}
//       <ToastContainer autoClose={6000} />
//       {loading && <Circles
//           height="80"
//           width="80"
//           color="#3f51b5"
//           ariaLabel="circles-loading"
//           wrapperClass={css.loading}
//           visible={true}
//         />}
//     </div>
//     );
//   }
// };
