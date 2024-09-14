import { useEffect, useState } from "react";
import "./App.css";
import { CategoryType, PricesType } from "./types";
import Table from "./Table";

function App() {
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [prices, setPrices] = useState<PricesType | null>(null);

  useEffect(() => {
    fetch("/categories.json")
      .then((response) => response.json())
      .then((categories) => setCategories(categories))
      .catch((error) => console.error("Error fetching categories:", error));

    fetch("/prices.json")
      .then((response) => response.json())
      .then((prices) => setPrices(prices))
      .catch((error) => console.error("Error fetching prices:", error));
  }, []);

  if (categories === null || prices === null)
    return (
      <div className="container">
        <p>Loading categories...</p>
      </div>
    );

  return (
    <div className="container">
      <h1>Item Data Table</h1>
      <Table categories_={categories} prices_={prices} />
    </div>
  );
}

export default App;
