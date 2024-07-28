import React from "react";
import { FaTrashAlt, FaCopy } from "react-icons/fa";
import FlipMove from "react-flip-move";

const ItemList = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul>
      <FlipMove>
        {items.map((it) => (
          <li className="item" key={it.id}>
            <input
              type="checkbox"
              checked={it.checked}
              onChange={() => {
                handleCheck(it.id);
              }}
            />
            <label
              style={it.checked ? { textDecoration: "line-through" } : null}
            >
              {it.item}
            </label>

            <FaTrashAlt
              role="button"
              tabIndex="0"
              onClick={() => handleDelete(it.id)}
              aria-label={`Delete ${it.item}`}
            />
            <FaCopy
              role="button"
              onClick={() => navigator.clipboard.writeText(it.item)}
            />
          </li>
        ))}
      </FlipMove>
    </ul>
  );
};

export default ItemList;
