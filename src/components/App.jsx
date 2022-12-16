import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export class App extends React.Component {

  state = {
    searchImageText: '',
  }

  formSubmitHandler = searchImageText => {
    this.setState({ searchImageText});
  }

  render() {
  return (
    <div>
      <Searchbar onSubmit={this.formSubmitHandler} />
      <ImageGallery searchImageText={this.state.searchImageText} />
      
      <ToastContainer autoClose={6000} />
    </div>
    );
  }
};
