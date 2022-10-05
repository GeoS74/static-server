import react from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useState } from "react";
import { RootFooter } from "../footer/RootFooter/RootFooter";
import { RootHeader } from "../header/RootHeader/RootHeader";
import { RootMain } from "../main/RootMain/RootMain";

function dbRequestsFromServer(setpage_markup) {
    const pathUrl = document.location.pathname;
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

function dbSearchRequestsServer() {
    fetch(`http://localhost:3500/api/files`).then(async (sear) => {
        if (sear.ok) {
            let search_data = await sear.json();
            for (let i in search_data) {
                sessionStorage.setItem(`${search_data[i]["fname"]}`, `${search_data[i]["title"]}`);
            }
        } else {
            console.log(sear.status);
        }
    });
}

export const FirstPage = () => {
    const [page_markup, setpage_markup] = useState("");
    if (sessionStorage.key[0] === null || sessionStorage.key[0] === undefined) {
        dbSearchRequestsServer();
    } else {
        console.log(sessionStorage.key[0]);
    }

    return (
        <div className={classNames(styles.root)}>
            <RootHeader />
            <RootMain page_markup={page_markup || dbRequestsFromServer(setpage_markup)} />
            <RootFooter />
        </div>
    );
};
