import React from "react";
import { useNavigate } from "react-router-dom";

function TrackList({totalRecord, posts, lang}) {
    const navigate = useNavigate();
    const handleTrackClick = (id) => {
        const encodeLang = encodeURIComponent(lang);
        const encodeId = encodeURIComponent(id);
        navigate(`/${encodeLang}/description/${encodeId}`);
    }

    const handleAuthorButtonClick = (e, author) => {
        e.stopPropagation();
        window.open("https://github.com/" + author);
    }

    const styleDescription = (tags) => {
        return tags.map((tag, index) => (
            <div key={index}>
                {tag.trim().length !== 0
                    ?
                    <div className={"tag-back"}>
                        <div className={"tag"}>
                            {tag.trim()}
                        </div>
                    </div>
                    : null}
            </div>
        ));
    };

    return (
        <div className={"trackList-sub-middle-container"}>
            {totalRecord === 0
                ? <h2 className={"noMatch"}>No matching tracks found.</h2>
                : posts.map(post => (
                    <div
                        key={post.id}
                        className="track"
                        onClick={() => handleTrackClick(post.id)}
                    >
                        <div className="track-left">
                            <h3>{post.title}</h3>
                            <div className={"description-tags"}>
                                {styleDescription(post.description.split("/"))}
                            </div>
                        </div>
                        <div className="track-right">
                            <button onClick={(e) => handleAuthorButtonClick(e, post.author)}>
                                <p className={"button-text"}>{post.author}</p>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TrackList;