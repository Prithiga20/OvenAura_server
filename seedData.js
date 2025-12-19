const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const products = [
  // Cupcakes
  {
    name: 'Classic Vanilla Cupcake',
    price: 50,
    category: 'cupcakes',
    description: 'Soft vanilla sponge with creamy vanilla frosting',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400',
    stock: 50
  },
  {
    name: 'Chocolate Fudge Cupcake',
    price: 60,
    category: 'cupcakes',
    description: 'Rich chocolate cupcake with fudge frosting',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400',
    stock: 45
  },
  {
    name: 'Red Velvet Cupcake',
    price: 70,
    category: 'cupcakes',
    description: 'Classic red velvet with cream cheese frosting',
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400',
    stock: 40
  },
  {
    name: 'Butterscotch Cupcake',
    price: 60,
    category: 'cupcakes',
    description: 'Butterscotch flavored cupcake with caramel frosting',
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400',
    stock: 35
  },

  // Cookies
  {
    name: 'Choco-Chip Cookie',
    price: 30,
    category: 'cookies',
    description: 'Classic chocolate chip cookies, crispy and delicious',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
    stock: 100
  },
  {
    name: 'Oatmeal Raisin Cookie',
    price: 25,
    category: 'cookies',
    description: 'Healthy oatmeal cookies with raisins',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
    stock: 80
  },
  {
    name: 'Butter Cookie',
    price: 20,
    category: 'cookies',
    description: 'Simple and classic butter cookies',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
    stock: 120
  },
  {
    name: 'Double Chocolate Cookie',
    price: 35,
    category: 'cookies',
    description: 'Rich chocolate cookies with chocolate chips',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400',
    stock: 60
  },

  // Pastries
  {
    name: 'Black Forest Pastry',
    price: 70,
    category: 'pastries',
    description: 'Chocolate sponge with cherries and whipped cream',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
    stock: 25
  },
  {
    name: 'Chocolate Truffle Pastry',
    price: 80,
    category: 'pastries',
    description: 'Rich chocolate pastry with truffle filling',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    stock: 20
  },
  {
    name: 'Red Velvet Pastry',
    price: 90,
    category: 'pastries',
    description: 'Red velvet cake slice with cream cheese frosting',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400',
    stock: 18
  },
  {
    name: 'Butterscotch Pastry',
    price: 75,
    category: 'pastries',
    description: 'Butterscotch flavored pastry with caramel sauce',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400',
    stock: 22
  },

  // Burgers
  {
    name: 'Classic Veg Burger',
    price: 70,
    category: 'burgers',
    subcategory: 'veg',
    description: 'Fresh veggie patty with lettuce, tomato, and mayo',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400',
    stock: 30
  },
  {
    name: 'Classic Chicken Burger',
    price: 100,
    category: 'burgers',
    subcategory: 'non-veg',
    description: 'Grilled chicken patty with fresh vegetables',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    stock: 25
  },
  {
    name: 'Cheese Veg Burger',
    price: 90,
    category: 'burgers',
    subcategory: 'veg',
    description: 'Veggie burger with extra cheese',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    stock: 28
  },
  {
    name: 'Paneer Tikka Burger',
    price: 120,
    category: 'burgers',
    subcategory: 'veg',
    description: 'Spicy paneer tikka with mint chutney',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e9a13086?w=400',
    stock: 20
  },

  // Pizzas
  {
    name: 'Margherita Pizza',
    price: 149,
    category: 'pizzas',
    subcategory: 'veg',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    sizes: [
      { size: 'Small', price: 149 },
      { size: 'Medium', price: 249 },
      { size: 'Large', price: 349 }
    ],
    stock: 15
  },
  {
    name: 'Chicken Pepperoni Pizza',
    price: 199,
    category: 'pizzas',
    subcategory: 'non-veg',
    description: 'Spicy pepperoni with mozzarella cheese',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    sizes: [
      { size: 'Small', price: 199 },
      { size: 'Medium', price: 299 },
      { size: 'Large', price: 399 }
    ],
    stock: 12
  },
  {
    name: 'Paneer Delight Pizza',
    price: 179,
    category: 'pizzas',
    subcategory: 'veg',
    description: 'Fresh paneer with bell peppers and onions',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    sizes: [
      { size: 'Small', price: 179 },
      { size: 'Medium', price: 279 },
      { size: 'Large', price: 379 }
    ],
    stock: 10
  },

  // Breads
  {
    name: 'Garlic Bread',
    price: 89,
    category: 'breads',
    description: 'Crispy bread with garlic butter',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400',
    stock: 40
  },
  {
    name: 'Cheesy Garlic Bread',
    price: 119,
    category: 'breads',
    description: 'Garlic bread topped with melted cheese',
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400',
    stock: 35
  },
  {
    name: 'Stuffed Garlic Bread',
    price: 129,
    category: 'breads',
    description: 'Garlic bread stuffed with cheese and herbs',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400',
    stock: 25
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Create admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@ovenaura.com',
      phone: '9999999999',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();
    console.log('Admin user created');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();