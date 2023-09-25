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
        <h2>{name}</h2>
        <input type="number" value={value} onChange={onChange} />
      </hgroup>
    );

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
