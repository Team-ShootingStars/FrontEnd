import React from "react";

function DescriptionText({longText}) {
    const oneLine = /\/\/.*$/;
    const multiLineStart = /\/\*.*$/;
    const multiLineEnd = /\*\/.*$/;
    let isMultiLineComment = false;

    const styledText = longText.map((line, lineIndex) => {
        const oneLineComment = line.match(oneLine);
        const multiLineCommentStart = line.match(multiLineStart);
        const multiLineCommentEnd = line.match(multiLineEnd);
        
        if (multiLineCommentStart) {
            isMultiLineComment = true;
            const notComment = line.split(multiLineCommentStart);
            return (
                <p>
                    {notComment}
                    <span className="green-text">
                        {multiLineCommentStart}
                    </span>
                </p>
            );
        }

        if (multiLineCommentEnd) {
            isMultiLineComment = false;
            const notComment = line.split(multiLineCommentEnd);
            return (
                <p>
                    <span className="green-text">
                        {notComment}*/
                    </span>
                </p>
            );
        }

        if (oneLineComment) {
            const notComment = line.split(oneLineComment);
            return (
                <p>
                    {notComment}
                    <span className="green-text">
                        {oneLineComment}
                    </span>
                </p>
            );
        }

        if (isMultiLineComment) {
            return (
                <p className="green-text">
                    {line}
                </p>
            )
        }

        else {
            return (
                <p>
                    {line}
                </p>
            );
        }
    });
        
    return (
        <div className={"description-text"}>
            {styledText}
        </div>
    );

}

export default DescriptionText;