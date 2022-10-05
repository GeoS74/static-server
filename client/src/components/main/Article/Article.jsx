import classNames from "classnames";
import react from "react";
import styles from "./styles.module.css";

export const Article = ({ page_markup }) => {
    return <div dangerouslySetInnerHTML={{ __html: page_markup }} className={classNames(styles.root)}></div>;
};
