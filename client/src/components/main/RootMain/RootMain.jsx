import react from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Article } from "../Article/Article";

export const RootMain = ({ page_markup }) => {
    return (
        <div className={classNames(styles.root)}>
            <Article page_markup={page_markup} />
        </div>
    );
};
