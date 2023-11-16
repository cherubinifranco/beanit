import styles from "./styles/item.module.css";

export const Item = (props) => {
  const {
    name = "name",
    value = "",
    type,
    icon,
    onClick = () => console.log("Something went wrong!"),
    onChange,
    alt,
    first,
    second,
    third,
    style = "normal",
    title = "Not defined title",
    placeholder = "",
    showPassword = true,
  } = props;
  if (type == "table")
    return (
      <hgroup
        className={styles.container + " " + styles.table + " " + styles[style]}
      >
        <span className={styles[style]}>{first}</span>
        <span className={styles[style]}>{second}</span>
        <span className={styles[style]}>{third}</span>
      </hgroup>
    );

  if (type == "input")
    return (
      <hgroup className={styles.container}>
        {name ? <h2>{name}</h2> : <></>}
        <input value={value} onChange={onChange} placeholder={placeholder} />
      </hgroup>
    );

  if (type == "input-button") {
    return (
      <hgroup className={styles.container}>
        <h2>{name}</h2>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
        />
        <button onClick={onClick} title={title}>
          {icon ? <img src={"./" + icon} alt={alt} /> : second}
        </button>
      </hgroup>
    );
  }
  if (type == "input-submit") {
    return (
      <form className={styles.container}>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
        />
        <button onClick={onClick} title={title} type="submit">
          {icon ? <img src={"./" + icon} alt={alt} /> : second}
        </button>
      </form>
    )
  }
  return (
    <hgroup className={styles.container}>
      <h2>{name}</h2>
      <p>{value}</p>
      <button onClick={onClick}>
        <img src={"./" + icon} alt={alt} />
      </button>
    </hgroup>
  );
};
