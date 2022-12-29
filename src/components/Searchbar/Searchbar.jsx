import React from "react";
import PropTypes from 'prop-types'
import css from '../Searchbar/Searchbar.module.css';
import { toast } from "react-toastify";
import { ImSearch } from 'react-icons/im';
import { useState } from "react";

export const Searchbar = ({ onSubmit }) => {
  
  const [searchImageText, setSearchImageText] = useState('');

  const handleChange = event => {
    setSearchImageText(event.currentTarget.value.toLowerCase());
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (searchImageText.trim() === '') {
      return toast.error("Введіть текст для пошуку");
    }
    onSubmit(searchImageText);
  };

  return (
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormButton}>
            <ImSearch size={20}/>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            value={searchImageText}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      
    )
}


// export class Searchbar extends React.Component {

//   state = {
//     searchImageText: '',
//   }

//   handleChange = event => {
//     this.setState({
//       searchImageText: event.currentTarget.value.toLowerCase()
//     });
//   }

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.searchImageText.trim() === '') {
//       return toast.error("Введіть текст для пошуку");
//     }
//     this.props.onSubmit(this.state.searchImageText);
//   };

//   render() {
//     return (
//       <header className={css.searchbar}>
//         <form onSubmit={this.handleSubmit} className={css.searchForm}>
//           <button type="submit" className={css.searchFormButton}>
//             <ImSearch size={20}/>
//             <span className={css.searchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             className={css.searchFormInput}
//             type="text"
//             value={this.state.searchImageText}
//             onChange={this.handleChange}
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
      
//     )
//   }
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}