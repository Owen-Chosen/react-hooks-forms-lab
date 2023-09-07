import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedName, setSelectedName] = useState("");
  const [currentEventTarget, setCurrentEventTarget] = useState("filter");
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Produce",
  });
  

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
    setCurrentEventTarget(event.target.name);
  }

  function handleSearchChange(event) {
    setSelectedName(event.target.value);
    setCurrentEventTarget(event.target.name);
  }

function onItemFormSubmit (name, category) {
    setNewItem({
      id: uuid(),
      name: name,
      category: category,
    })
  itemsToDisplay.push(newItem)
}

  const itemsToDisplay = items.filter((item) => {
    
    if (currentEventTarget === "search") {
      if (selectedName === "") return true;
      return item.name.toLowerCase().includes(selectedName.toLowerCase());
    }

    else if (currentEventTarget === "filter") {
      if (selectedCategory === "All") return true;
      return item.category === selectedCategory;
    }
   
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange = {handleSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
