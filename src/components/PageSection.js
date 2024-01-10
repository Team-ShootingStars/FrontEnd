import React from "react";

function PageSection({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="language-section">
            {pageNumbers.map(number => (
                <button 
                    key={number} 
                    className={number === currentPage ? "active" : ""}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}
        </div>
    );
}

export default PageSection;
