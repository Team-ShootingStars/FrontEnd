import React from "react";

function DescriptionTextPython({longText}) {
    const oneLine = /\#.*$/;
    const multiLineSmall = /\'\'\'.*$/;
    const multiLineBig = /\"\"\".*$/;
    let isSmallComment = false;
    let isBigComment = false;

    const styledText = longText.map((line, lineIndex) => {
        const oneLineComment = line.match(oneLine);
        const multiLineSmallComment = line.match(multiLineSmall);
        const multiLineBigComment = line.match(multiLineBig);
        
        if (multiLineSmallComment && isSmallComment) {
            isSmallComment = false;
            const notComment = line.split(multiLineSmallComment);
            return (
                <p>
                    <span className="green-text">
                        {notComment}'''
                    </span>
                </p>
            );
        }

        if (multiLineBigComment && isBigComment) {
            isBigComment = false;
            const notComment = line.split(multiLineBigComment);
            return (
                <p>
                    <span className="green-text">
                        {notComment}"""
                    </span>
                </p>
            );
        }

        if (multiLineSmallComment) {
            isSmallComment = true;
            const notComment = line.split(multiLineSmallComment);
            return (
                <p>
                    {notComment}
                    <span className="green-text">
                        {multiLineSmallComment}
                    </span>
                </p>
            );
        }

        if (multiLineBigComment) {
            isBigComment = true;
            const notComment = line.split(multiLineBigComment);
            return (
                <p>
                    {notComment}
                    <span className="green-text">
                        {multiLineBigComment}
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

        if (isSmallComment || isBigComment) {
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

export default DescriptionTextPython;