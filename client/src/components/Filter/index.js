import React, { useState } from "react";

export default function Filter({ onFilter }) {
  const [condition, setCondition] = useState("=");
  const [value, setValue] = useState("name");
  const [query, setQuery] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    onFilter(value, condition, query);
  };

  return (
    <div>
      <h3>Фильтр:</h3>
      <form className='search-form'>
        <fieldset>
          Колонка
          <label>
            <select
              onChange={(e) => setValue(e.target.value)}
              value={value}
              name='value'
            >
              <option value='name'> Name </option>
              <option value='amount'> Amount </option>
              <option value='distanse'> Distanse </option>
            </select>
          </label>
          <label>
            Условие
            <select
              onChange={(e) => setCondition(e.target.value)}
              value={condition}
              name='condition'
            >
              <option value='='> Равно </option>
              <option value='>' disabled={value === "name"}>
                Больше
              </option>
              <option value='<' disabled={value === "name"}>
                Меньше
              </option>
              <option
                value='includes'
                disabled={value === "amount" || value === "distanse"}
              >
                {" "}
                Содержит{" "}
              </option>
            </select>
          </label>
          Значение
          <input
            className='filter-input'
            type={value === "name" ? "text" : "number"}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </fieldset>
        <button type='submit' onClick={(e) => formSubmitHandler(e)}>
          Найти
        </button>
      </form>
    </div>
  );
}
