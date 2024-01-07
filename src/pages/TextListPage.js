import React from "react";
import {useParams} from "react-router-dom";
function TextListPage() {
    const params = useParams()

    return(
        <div>
            <p>TextListPage</p>
            <p>Lang = {params.codeLang}</p>
        </div>
    )
}

export default TextListPage;