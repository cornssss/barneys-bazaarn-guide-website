import React, { useState, useEffect } from "react";
import { CategoryType, PricesType, TierType } from "./types";

interface TableProps {
  craftings: CategoryType[];
  market: any;
}

const Table: React.FC<TableProps> = ({ craftings, market }) => {
  const [categories, setCategories] = useState<CategoryType[]>(craftings);
  //   const [prices, setPrices] = useState<PricesType>(prices_);

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
          item.Price = priceMapping[item.id] ?? market?.prices?.[item.id] ?? 0;
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

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          {category.Tiers.map((tier, tierIndex) => {
            const borderColor = category.Color;

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
                      <th></th>
                      <th>Name</th>
                      <th>Current Price</th>
                      <th>Total Quantity</th>
                      {/* <th>Market Quantity</th> */}
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tier.Items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td>
                          <img
                            src={item.Icon}
                            style={{
                              width: 40,
                              height: 40,
                            }}
                          />
                        </td>
                        <td>{item.Name}</td>
                        <td>{item.Price}</td>
                        <td>{item.totalQuantity}</td>
                        {/* <td>{market?.counts?.[item.id]}</td> */}
                        <td>{item.totalPrice}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3}> </td>
                      <td
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Overall Price
                      </td>
                      <td
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        {tier.Price * tier.Multiplier}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}> </td>
                      <td
                        colSpan={1}
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Tier Price / Points
                      </td>
                      <td
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        {tier.Price / tier.Points}
                      </td>
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
