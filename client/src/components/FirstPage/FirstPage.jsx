import react from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useState } from "react";
import { RootFooter } from "../footer/RootFooter/RootFooter";
import { RootHeader } from "../header/RootHeader/RootHeader";
import { RootMain } from "../main/RootMain/RootMain";

function dbRequestsFromServer(setpage_markup, searchPathUrl = null) {
    const pathUrl = searchPathUrl === null ? document.location.pathname : searchPathUrl;
    fetch(`http://localhost:3500${pathUrl}`, {
        headers: {
            accept: "text/html",
        },
    }).then(async (req) => {
        if (req.ok) {
            let page_data = await req.text();
            setpage_markup(page_data);
        } else {
            console.log(req.status);
        }
    });
}

export const FirstPage = () => {
    const [page_markup, setpage_markup] = useState("");

    return (
        <div className={classNames(styles.root)}>
            <RootHeader setpage_markup={setpage_markup} dbRequestsFromServer={dbRequestsFromServer} />
            <RootMain page_markup={page_markup || dbRequestsFromServer(setpage_markup)} />
            <RootFooter />
        </div>
    );
};
