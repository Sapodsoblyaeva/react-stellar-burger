import styles from "./404.module.css"

export const Page404 = () => {
  return (
    <div className={styles.unreachable}>
      <div className={styles.unreachable__container}>
        <h1 className="text text_type_digits-large text_color_inactive">404</h1>
        <p className="text text_type_main-large text_color_inactive">(×﹏×)</p>
      </div>
    </div>
  )
}
