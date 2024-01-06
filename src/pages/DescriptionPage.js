import React from "react";
import {useParams} from "react-router-dom";
function DescriptionPage() {
    const params = useParams()

    return(
        <div>
            <p>DescriptionPage</p>
            <p>Lang = {params.codeLang}</p>
            <p>Lang = {params.textId}</p>
        </div>
    )
}

export default DescriptionPage;