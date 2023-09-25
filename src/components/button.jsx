import styles from "./styles/button.module.css";

export function Button(props) {


    const {style = "primary", text = "Texto del botón", onClick, type = "button", anchor} = props

    if(type == "button") return (<button className={styles[style]+ " " + styles.btn} onClick={onClick}>{text}</button>)
    else if (type == "link") return (<a className={styles[style]+ " " + styles.btn} onClick={onClick} href={"#"+ anchor}>{text}</a>)
    else return (<h1>Wrong Type</h1>)
  
}
