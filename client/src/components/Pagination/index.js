import React from "react";
import "./pagination.css";

export default function Pagintion({ itemsPerPage, totalItems, paginate }) {
  const pageNummbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNummbers.push(i);
  }

  return (
    <div>
      <ul className='pagination-list'>
        {pageNummbers.map((number) => (
          <li className='pagination-list__item' key={number}>
            <a
              className='pagination-list__link'
              href='!#'
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
