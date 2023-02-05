import React, { useState } from "react";
import styles from "./Suggestion.module.css";

const SuggestionList = (props) => {
    const [SuggestionLists, setSuggList] = useState([]);

    useEffect(() => {
        //setDiaryEntries = axios.get
        console.log("trying to fetch within useEffect in DiaryList component");
        fetch("http://127.0.0.1:8000/diaries/") // change
            .then((response) => {
            return response.json();
            }).then(data => {
                console.log("data is", data);
                const diaryList = data.map((suggestion) => (
                <Suggestion
                    onClick={props.onClick}
                    className={styles["suggestion"]}
                    key={suggestion.id}
                    id = {suggestion.id}
                    placeName = {suggestion.placeName}
                    rating = {suggestion.rating}
                    cuisine = {suggestion.cuisine}
                    street = {suggestion.street}
                    isOpen = {suggestion.isOpen}
                    price = {suggestion.price} /* string */
                    flexAccount = {suggestion.flexAccount} /* boolean */
                    oneCard = {suggestion.oneCard} /* boolean */
                    />
                ));
                setDiaryEntries(diaryList);
            })
            .catch((err) => console.log(err));
          //setIsDiaryEntryAdded(false);
        }, [props.isFetched]); // change

    return(
        <ul className={styles.scrollable}>
            <li className={styles["suggestion-list"]}>
            </li>
        {SuggestionLists}
        </ul>
    );
}
