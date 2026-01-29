import React from "react";

export default function List({ items }) {
  console.log(items);
  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          <span>{item.name} {item.flavours ? `(${item.flavours} sabores)` : ""} </span> <span>${item.price}</span>
        </li>
      ))}
    </ul>
  );
}
