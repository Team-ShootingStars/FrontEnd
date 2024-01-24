import React from "react";

function DescriptionText({longText, lang}) {

    let inBlockComment = false; // 블럭 주석인지 아닌지 판단
    let lineCommentRegex, blockCommentStartRegex;
    // 정규식
    if (lang === "JAVA" || lang === "JS" || lang === "CPP") {
        lineCommentRegex = /\/\/.*$/; // 라인 주석 "//" 시작 부터 끝까지
        blockCommentStartRegex = /\/\*.*$/; // 블럭 주석 시작 문자 "/*" 시작 부터 끝까지
    } else if (lang === "PYTHON") {
        lineCommentRegex = /#.*$/; // 라인 주석 "#" 시작 부터 끝까지
        blockCommentStartRegex = /['"]{3}.*$/; // 블럭 주석 시작 문자 '3개, "3개 시작 부터 끝까지
    }

    const styledText = longText.map((line, lineIndex) => {
        const lineCommentMatch = line.match(lineCommentRegex); // 라인 주석 정규식으로 처리 match[0] 주석이 들어있다.
        const blockCommentStartMatch = line.match(blockCommentStartRegex); // 블럭 주석 정규식으로 처리 match[0] 주석이 들어있다.

        // 블럭 주석 시작 지점을 지났고 현재 블럭 주석 내부인 경우
        if (inBlockComment) {
            let blockCommentEndMatch
            if (lang === "JAVA" || lang === "JS" || lang === "CPP") {
                blockCommentEndMatch = line.match(/.*\*\//) // 주석 내부 부분
            } else if (lang === "PYTHON") { // 해당 줄에서 """ 혹은 '''  를 찾는다. 있다면 해당 라인에서 블럭 주석이 끝난다.
                blockCommentEndMatch = line.match(/.*['"]{3}/); // 주석 내부 부분
            }

            if (blockCommentEndMatch) { // blockCommentEndMatch 가 null 이 아니라면 해당 줄에서 블럭 주석이 끝난다는 뜻
                // 블록 주석이 끝난 경우
                inBlockComment = false;
                const afterComment = line.split(blockCommentEndMatch)[1]

                return (
                    <p key={lineIndex} className={"description-text"}>
                        <span className={"comment"}>
                            {blockCommentEndMatch[0]}
                        </span>
                        {afterComment}
                    </p>
                );
            } else {
                // 블록 주석 내부에 있는 경우
                return (
                    <p key={lineIndex} className={"description-text"}>
                        <span className={"comment"}>
                            {line}
                        </span>
                    </p>
                );
            }
        } else if (lineCommentMatch) { // 줄 주석에 내용이 있는 경우
            const beforeComment = line.split(lineCommentMatch)[0]; // 주석 이전 부분

            return (
                <p key={lineIndex} className={"description-text"}>
                    {beforeComment}
                    <span className="comment">
                        {lineCommentMatch}
                    </span>
                </p>
            );
        } else if (blockCommentStartMatch) { // 블럭 주석이 시작된 경우

            let blockCommentEndMatch
            if (lang === "JAVA" || lang === "JS" || lang === "CPP") {
                blockCommentEndMatch = line.match(/\/\*.*\*\//) // 주석 내부 부분
            } else if (lang === "PYTHON") { // 해당 줄에서 """ 혹은 '''  를 찾는다. 있다면 해당 라인에서 블럭 주석이 끝난다.
                blockCommentEndMatch = line.match(/['"]{3}.*['"]{3}/); // 주석 내부 부분
            }

            if (blockCommentEndMatch) {
                let beforeComment;
                let afterComment;
                let comment;
                if (lang === "PYTHON") {
                    beforeComment = line.split(blockCommentStartMatch)[0]; // 주석 이전 부분
                    afterComment = line.split(blockCommentEndMatch)[1];
                    comment = line.split(beforeComment)[1].split(afterComment)[0];
                } else {
                    beforeComment = line.split(blockCommentStartMatch)[0]; // 주석 이전 부분
                    afterComment = line.split(blockCommentEndMatch)[1];
                    comment = blockCommentEndMatch;
                }
                return (
                    <p key={lineIndex} className={"description-text"}>
                        {beforeComment}
                        <span className="comment">{comment}</span>
                        {afterComment}
                    </p>
                );
            } else {
                inBlockComment = true;
                
                const beforeComment = line.split(blockCommentStartMatch)[0]; // 주석 이전 부분

                return (
                    <p key={lineIndex} className={"description-text"}>
                        {beforeComment}
                        <span className="comment">
                        {blockCommentStartMatch}
                    </span>
                    </p>
                );
            }
        } else { // 주석이 없는 라인인 경우
            return (
                <p key={lineIndex} className={"description-text"}>{line}</p>
            );
        }
    });
        
    return (
        <div className={"description-text-container"}>
            {styledText}
        </div>
    );

}

export default DescriptionText;