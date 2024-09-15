import { useEffect, useState } from "react";
import "./App.css";
import { CategoryType, PricesType } from "./types";
import Table from "./Table";

const api =
  "https://pixels-server.pixels.xyz/cache/marketplace/listings/count?v=";

function App() {
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [market, setMarket] = useState(null);

  useEffect(() => {
    // Fetch categories and prices simultaneously
    const fetchCategories = fetch("/categories.json")
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching categories:", error));

    // const fetchDynamicPrices = fetch(api + Math.floor(Date.now() / 1000))
    const fetchDynamicPrices = fetch("/market.json")
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching dynamic prices:", error));

    Promise.all([fetchCategories, fetchDynamicPrices])
      .then(([categoriesData, marketData]) => {
        setCategories(categoriesData);
        setMarket(marketData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (categories === null || market === null)
    return (
      <div className="container">
        <p>Loading categories...</p>
      </div>
    );

  return (
    <div className="container">
      <h1>Barney's Bazaarn Crafting Recipes v1.23</h1>
      <p>
        Prices are manually updated, as there are no public endpoints available
        yet. Please pixels :(
      </p>
      <p>
        Contact me on discord for feedbacks and suggestions :){" "}
        <span style={{ fontWeight: "bold", fontSize: 20 }}>mira.gg</span>
      </p>
      <Table craftings={categories} market={market} />
    </div>
  );
}

export default App;
