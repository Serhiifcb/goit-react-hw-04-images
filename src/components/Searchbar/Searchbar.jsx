import React from "react";
import css from '../Searchbar/Searchbar.module.css';
import { toast } from "react-toastify";
import { ImSearch } from 'react-icons/im';

export class Searchbar extends React.Component {

  state = {
    searchImageText: '',
  }

  handleChange = event => {
    this.setState({
      searchImageText: event.currentTarget.value.toLowerCase()
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchImageText.trim() === '') {
      return toast.error("Введіть текст для пошуку");
    }
    this.props.onSubmit(this.state.searchImageText);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormButton}>
            <ImSearch size={20}/>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            value={this.state.searchImageText}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      
    )
  }
}

