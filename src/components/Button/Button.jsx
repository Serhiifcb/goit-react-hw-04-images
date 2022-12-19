import css from "../Button/Button.module.css"
import PropTypes from 'prop-types'

export const Button = ({ loadMore }) => {
  return (
    <div className={css.buttonBlock}>
      <button type="button" className={css.button} onClick={() => { loadMore(); }}>Load more</button >
    </div>
  )
} 

Button.propTypes = {
  loadMore:PropTypes.func.isRequired
}