import React, { useState } from "react";
import styles from "./Suggestion.module.css";

const SuggestionList = (props) => {
    const [SuggestionLists, setSuggList] = useState([]);

    return(
        <ul className={styles.scrollable}>
            <li className={styles["suggestion-list"]}>
            </li>
        {SuggestionLists}
        </ul>
    );
}
