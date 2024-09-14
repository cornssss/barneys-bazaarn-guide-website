import React, { useState, useEffect } from "react";
import { CategoryType, PricesType, TierType } from "./types";

interface TableProps {
  categories_: CategoryType[];
  prices_: PricesType;
}

const Table: React.FC<TableProps> = ({ categories_, prices_ }) => {
  const [categories, setCategories] = useState<CategoryType[]>(categories_);
  const [prices, setPrices] = useState<PricesType>(prices_);

  useEffect(() => {
    calculatePrices();
  }, []);

  const calculatePrices = () => {
    const categoriesTemp = [...categories];

    categoriesTemp.forEach((category) => {
      category.Tiers.forEach((tier) => {
        let tierPrice = 0;

        const priceMapping: { [key: string]: number } = {
          itm_basebox: 400,
          itm_tier1box: category.Tiers[0].Price,
          itm_tier2box: category.Tiers[1].Price,
          itm_tier3box: category.Tiers[2].Price,
        };

        tier.Items.forEach((item) => {
          item.totalQuantity = tier.Multiplier * item.Quantity;
          item.Price = priceMapping[item.id] ?? prices?.[item.id]?.coins ?? 0;
          item.totalPrice = item.Price * item.totalQuantity;
          tierPrice += item.Price * item.Quantity;
        });

        tier.Price = tierPrice;
      });
    });

    setCategories(categoriesTemp);
  };

  const handleMultiplierChange = (
    category: CategoryType,
    tier: TierType,
    value: string
  ) => {
    const multiplier = Number(value);

    if (!Number.isInteger(multiplier) || multiplier <= 0) {
      console.error(
        "Invalid input: Please enter a whole number greater than 0."
      );
      return;
    }

    tier.Multiplier = multiplier;

    calculatePrices();
  };

  // Generate a border color based on the category index or other property
  const getBorderColor = (index: number) => {
    const colors = [
      "#6796d3",
      "#af8c5f",
      "#a6a6a6",
      "#d0b651",
      "#5b5b5b",
      "#9f6f8e",
      "#cbdfeb",
      "#ffadbb",
      "#64b559",
    ];
    return colors[index % colors.length];
  };

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          {category.Tiers.map((tier, tierIndex) => {
            const borderColor = getBorderColor(index);

            return (
              <div key={tierIndex}>
                <div className="multiplier-container">
                  <label className="multiplier-label">
                    <span style={{ fontWeight: "bold" }}>
                      {category.Name} T{tier.Tier} - {tier.Points} Points
                    </span>
                    {" ------------ Multiplier: "}
                  </label>
                  <input
                    type="number"
                    value={tier.Multiplier}
                    min="1"
                    onChange={(e) => {
                      handleMultiplierChange(category, tier, e.target.value);
                    }}
                    className="multiplier-input"
                  />
                </div>

                <table
                  style={{
                    border: `2px solid ${borderColor}`,
                    borderCollapse: "collapse",
                  }}
                >
                  <thead
                    style={{
                      background: borderColor,
                      borderCollapse: "collapse",
                    }}
                  >
                    <tr>
                      <th>Name</th>
                      <th>Current Price</th>
                      <th>Total Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tier.Items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td>{item.Name}</td>
                        <td>{item.Price}</td>
                        <td>{item.totalQuantity}</td>
                        <td>{item.totalPrice}</td>
                      </tr>
                    ))}
                    <tr>
                      <th colSpan={3}>Overall Price</th>
                      <th>{tier.Price}</th>
                    </tr>
                    <tr>
                      <th colSpan={3}>Tier Price / Points</th>
                      <th>{tier.Price / tier.Points}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Table;
