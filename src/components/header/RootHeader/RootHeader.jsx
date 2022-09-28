import classNames from "classnames";
import react from "react";
import { ButtonRequestGit } from "../ButtonRequestGit/ButtonRequestGit";
import styles from "./styles.module.css";

export const RootHeader = () => {
    return (
        <div className={classNames(styles.root)}>
            <ButtonRequestGit />
        </div>
    );
};
