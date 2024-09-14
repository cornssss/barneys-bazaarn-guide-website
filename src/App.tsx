import { useEffect, useState } from "react";
import "./App.css";
import { CategoryType, PricesType } from "./types";
import Table from "./Table";

function App() {
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [prices, setPrices] = useState<PricesType | null>(null);
  const [market, setMarket] = useState(null);

  useEffect(() => {
    fetch("/categories.json")
      .then((response) => response.json())
      .then((categories) => setCategories(categories))
      .catch((error) => console.error("Error fetching categories:", error));

    fetch("/prices.json")
      .then((response) => response.json())
      .then((prices) => setPrices(prices))
      .catch((error) => console.error("Error fetching prices:", error));

    //     fetch(api + market === null ? 1 : 0)
    //       .then((response) => response.json())
    //       .then((prices) => setPrices(prices))
    //       .catch((error) => console.error("Error fetching prices:", error));
  }, []);

  if (categories === null || prices === null)
    return (
      <div className="container">
        <p>Loading categories...</p>
      </div>
    );

  return (
    <div className="container">
      <h1>Barney's Bazaarn Crafting Recipes v1.17</h1>
      <p>
        Prices are manually updated, as there are no public endpoints available
        yet. Please pixels :(
      </p>
      <p>
        Contact me on discord for feedbacks and suggestions :){" "}
        <span style={{ fontWeight: "bold", fontSize: 20 }}>mira.gg</span>
      </p>
      <Table categories_={categories} prices_={prices} />
    </div>
  );
}

export default App;
