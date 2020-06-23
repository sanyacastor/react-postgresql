import React, { useState, useEffect } from "react";

import "./list.css";

export default function List({ users }) {
  const [order, setOrder] = useState(false);
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    setSortedItems(users);
  }, [users]);

  const onSort = (field) => {
    let sortedItems = users.slice();

    if (field === "name") {
      sortedItems.sort(function (a, b) {
        if (a[field] > b[field]) {
          return 1;
        }
        if (a[field] < b[field]) {
          return -1;
        }
        return 0;
      });
    } else {
      sortedItems.sort(function (a, b) {
        return b[field] - a[field];
      });
    }

    setSortedItems(order ? sortedItems : sortedItems.reverse());
    setOrder(!order);
  };

  return (
    <>
      <div className='list-header'>
        <button className='list-header-cell' onClick={() => onSort("name")}>
          name
        </button>
        <button className='list-header-cell' onClick={() => onSort("amount")}>
          amount
        </button>
        <button className='list-header-cell' onClick={() => onSort("distanse")}>
          distanse
        </button>
      </div>

      <ul className='list'>
        {sortedItems.map((user) => (
          <li className='list-item' key={user.id}>
            <span className='list-item-cell'>{user.name}</span>
            <span className='list-item-cell'>{user.amount}</span>
            <span className='list-item-cell'>{user.distanse}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
