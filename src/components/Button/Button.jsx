import css from "../Button/Button.module.css"

export const Button = ({ loadMore }) => {
  return (
    <div className={css.buttonBlock}>
      <button type="button" className={css.button} onClick={() => { loadMore(); }}>Load more</button >
    </div>
  )
} 
  