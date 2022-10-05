import react from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

export const RootFooter = () => {
    return <div className={classNames(styles.root)}>Это страница снизу</div>;
};
