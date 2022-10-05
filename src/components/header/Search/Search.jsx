import react from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useState } from "react";
import { DropDownList } from "../DropDownList/DropDownList";

export const Search = () => {
    function searchInput(event) {
        let valueInput = event.target.value.toLowerCase();
        let listSearch = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            let keys = sessionStorage.key(i).toLowerCase();
            if (keys.includes(valueInput) === true) {
                listSearch.push(sessionStorage.getItem(sessionStorage.key(i)));
            }
        }
        setSearchHook(listSearch);
    }

    const [searchHook, setSearchHook] = useState([]);
    return (
        <p>
            <input onInput={searchInput} list="asd"></input>
            <datalist id="asd">
                {searchHook.map((strResult) => (
                    <DropDownList valueStrSearch={strResult} />
                ))}
            </datalist>
        </p>
    );
};
