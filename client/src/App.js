import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import List from "./components/List";
import Pagination from "./components/Pagination";
import { fetchItems } from "./services/postgree_db";

import { Layout, Menu } from "antd";
const { Header, Content } = Layout;

function App() {
  const [items, setItems] = useState([]);
  const [filtredItems, setFiltredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const getData = async () => {
      let items = await fetchItems();
      return items;
    };

    getData().then((res) => {
      setItems(res);
      setFiltredItems(res);
    });
  }, []);

  const onFilter = (value, condition, query) => {
    let newItems = items.slice();
    let typedQuery = value === "name" ? query.toLowerCase() : parseInt(query);

    if (query.trim().length !== 0) {
      switch (condition) {
        case ">":
          newItems = newItems.filter((item) => item[value] >= typedQuery);
          break;
        case "<":
          newItems = newItems.filter((item) => item[value] <= typedQuery);
          break;
        case "=":
          newItems = newItems.filter(
            (item) => item[value].toLowerCase() === typedQuery
          );
          break;
        case "includes":
          newItems = newItems.filter((item) =>
            item[value].toLowerCase().includes(typedQuery)
          );
          break;
        default:
          return;
      }
    }

    setFiltredItems(newItems);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='App'>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Menu theme='dark' mode='horizontal'></Menu>
        </Header>
        <Content style={{ padding: "50px 50px" }}>
          <Filter onFilter={onFilter} />
          <List users={currentItems} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filtredItems.length}
            paginate={paginate}
          />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
