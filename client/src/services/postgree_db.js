export const fetchItems = async () => {
  const res = await fetch("http://localhost:3001");
  const data = await res.json();
  return data;
};

export const filterItems = async (body) => {
  try {
    const res = await fetch("http://localhost:3001/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
    
  } catch (error) {
    alert(error);
  }
};
