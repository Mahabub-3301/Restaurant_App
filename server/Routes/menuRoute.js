const express = require('express');
const mongoose = require('mongoose')
const MenuItem = require('../models/menu')

const router = express.Router()


router.get("/menu", async (req, res) => {
  try {
    const items = await MenuItem.find();

    // Group items by category
    const grouped = items.reduce((acc, item) => {
      const category = acc.find(c => c.category === item.category);
      if (category) {
        category.items.push({
          name: item.name,
          description: item.description,
          price: item.price,
        });
      } else {
        acc.push({
          category: item.category,
          items: [
            {
              name: item.name,
              description: item.description,
              price: item.price,
            },
          ],
        });
      }
      return acc;
    }, []);

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Error fetching menu", error: err });
  }
});

router.post("/menu", async (req, res) => {
  const { category, name, description, price } = req.body;

  if (!category || !name || !description || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newItem = new MenuItem({ category, name, description, price });
    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (err) {
    res.status(500).json({ message: "Error adding item", error: err });
  }
});


module.exports = router;