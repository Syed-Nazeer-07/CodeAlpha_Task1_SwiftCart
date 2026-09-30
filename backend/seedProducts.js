require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const importData = async () => {
  try {
    // 1. Connect to DB
    await connectDB();
    
    // 2. Fetch 100 products from DummyJSON API
    console.log('Fetching products from DummyJSON...');
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data = await response.json();
    
    // 3. Transform data to match Product schema
    const newProducts = data.products.map((p) => {
      return {
        title: p.title,
        description: p.description,
        price: p.price,
        image: p.thumbnail, // or p.images[0]
        category: p.category,
        stock: p.stock,
        rating: p.rating
      };
    });

    // 4. Prevent duplicates (check existing titles)
    const existingTitles = await Product.find().select('title -_id');
    const existingTitleSet = new Set(existingTitles.map(p => p.title));
    
    const productsToInsert = newProducts.filter(p => !existingTitleSet.has(p.title));

    // 5. Insert to MongoDB
    if (productsToInsert.length > 0) {
      await Product.insertMany(productsToInsert);
      console.log(`Products Inserted Successfully`);
      console.log(`Total Products Added: ${productsToInsert.length}`);
    } else {
      console.log('No new products to insert (duplicates bypassed).');
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
