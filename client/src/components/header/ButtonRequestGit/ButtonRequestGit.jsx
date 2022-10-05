import react from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

export const ButtonRequestGit = () => {
    return (
        <button className={"btn btn-warning"} onClick={() => (window.location = "/")}>
            На главную
        </button>
    );
};
