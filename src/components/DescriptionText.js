import React from "react";

function DescriptionText({longText}) {
    return (
        <div className={"description-text"}>
            {Array.from(longText).map((text, index) => (
                <p
                    key={index}
                    style={{
                    color: 'white',
                    }}
                >
                    {text}
                </p>
            ))}   
        </div>
    )
}

export default DescriptionText;