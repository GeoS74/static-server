import react from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
export const DropDownList = ({ valueStrSearch }) => {
    function keyDown(event) {
        let ddd = event.target.value;
        console.log(ddd);
    }

    return (
        <option
            value={valueStrSearch}
            onClick={(e) => {
                console.log(e.target.value);
            }}
        ></option>
    );
};
