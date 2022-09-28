import react from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

export const ButtonRequestGit = ({ setpage_markup }) => {
    return (
        <button className={classNames(styles.button)} onClick={setpage_markup("")}>
            На главную
        </button>
    );
};
