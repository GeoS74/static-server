import react from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useState } from "react";
import { RootFooter } from "../footer/RootFooter/RootFooter";
import { RootHeader } from "../header/RootHeader/RootHeader";
import { RootMain } from "../main/RootMain/RootMain";

function dbReuestsFromServer(setpage_markup) {
    const pathUrl = document.location.pathname;
    fetch(`http://localhost:3500${pathUrl}`, {
        headers: {
            accept: "text/html",
        },
    }).then(async (req) => {
        if (req.ok) {
            let page_data = await req.text();
            setpage_markup(page_data);

            console.log(page_data);
        } else {
            console.log(req.status);
        }
    });
}

export const FirstPage = () => {
    const [page_markup, setpage_markup] = useState(dbReuestsFromServer(setpage_markup));
    if (useState === "") {
        dbReuestsFromServer(setpage_markup);
    }
    console.log(123);
    return (
        <div className={classNames(styles.root)}>
            <RootHeader setpage_markup={setpage_markup} />
            <RootMain page_markup={page_markup} />
            <RootFooter />
        </div>
    );
};
