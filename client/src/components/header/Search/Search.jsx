import react from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useState } from "react";
import { DropDownList } from "../DropDownList/DropDownList";
import { useEffect } from "react";

export const Search = () => {
    // получение json с сервера и записываем его в hook searchHook
    const [searchHook, setSearchHook] = useState([]);
    const dbSearchRequestsServer = () => {
        fetch(`http://localhost:3500/api/files`).then(async (sear) => {
            if (sear.ok) {
                let search_data = await sear.json();
                setSearchHook(search_data);
            }
        });
    };
    useEffect(() => {
        dbSearchRequestsServer();
    }, []);

    // делает сравнение и отбор в input и json по полю title
    const [value, setValue] = useState("");
    const filtredSarch = searchHook.filter((search) => {
        return search.title.toLowerCase().includes(value.toLowerCase());
    });

    const [isOpen, setIsOpen] = useState(true);

    // отправляет значение из  выпадающего меню в input
    const searchClickHendler = (e) => {
        setValue(e.target.textContent);
        setIsOpen(!isOpen);
        console.log(value);
    };

    const inputClickHendler = () => {
        setIsOpen(true);
    };

    return (
        <div>
            <div className="form">
                <form className={classNames(styles.search_form)}>
                    <input
                        type="text"
                        placeholder="Поиск"
                        className={classNames(styles.search_input)}
                        value={value}
                        onInput={(event) => setValue(event.target.value)}
                        onClick={inputClickHendler}
                    />
                    <ul className={classNames(styles.autocomplite)}>
                        {value && isOpen
                            ? filtredSarch.map((str, index) => {
                                  return (
                                      <li
                                          className={classNames(styles.autocomplite_item)}
                                          onClick={searchClickHendler}
                                          key={index}
                                      >
                                          {str.title}
                                      </li>
                                  );
                              })
                            : null}
                    </ul>
                </form>
            </div>
        </div>
    );

    // return (
    //     <p>
    //         <input onInput={searchInput} list="asd" autoComplete="off" placeholder="Поиск по меткам" onChange={(event) => console.log(event.target.value)}></input>
    //         <datalist id="asd">
    //             {searchHook.map((strResult) => (
    //                 <DropDownList valueStrSearch={strResult} />
    //             ))}
    //         </datalist>
    //     </p>
    // );
};
