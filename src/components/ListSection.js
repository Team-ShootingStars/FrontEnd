import React, { useState, useEffect } from 'react';

import "../styles/TextListPage.css"

function ListSection({}) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // 데이터 페칭 로직
        fetch('API_ENDPOINT')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className={"list-section"}>
            {/* 리스트들 */}
            {posts.map(post => (
                <div key={post.id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                </div>
            ))}
        </div>
    );

}

export default ListSection;