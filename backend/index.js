import express from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";


const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Admin_123",
    database:"manawari"
})

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());

// Verify JWT token middleware
function verifyToken(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '')
  if (!token) return res.status(401).send('Access denied. No token provided.')

  try {
    const decoded = jwt.verify(token, 'your_secret_key')
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).send('Invalid token.')
  }
}

app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})

//get all products
app.get("/products", (req,res)=>{
    const q= "SELECT * FROM products"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//get items in bag
app.get("/bag-items", (req,res)=>{
  const q= "SELECT * FROM bag_items"
  db.query(q,(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
})

//insert data
app.post("/add-product",(req,res)=>{
    const q = "INSERT INTO products(`prod_name`,`prod_description`,`prod_price`,`prod_image`,`category`) VALUES (?)"
    const values = [
        req.body.prod_name,
        req.body.prod_description,
        req.body.prod_price,
        req.body.prod_image,
        req.body.category
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Product has been added successfuly")
    })
})

// add to bag:
app.post('/add-to-bag', (req, res) => {
  try {
    const { product_id, product_name, product_price, quantity, product_img } = req.body;

    // Check if the product already exists in the bag
    const selectQuery = 'SELECT * FROM bag_items WHERE product_id = ?';
    const selectValues = [product_id];

    db.query(selectQuery, selectValues, (selectErr, selectResults) => {
      if (selectErr) {
        console.error('Error selecting from bag_items table:', selectErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (selectResults.length > 0) {
        // Product already exists, update the quantity
        const updatedQuantity = selectResults[0].quantity + quantity;

        if (updatedQuantity <= 0) {
          // If the updated quantity is zero or negative, delete the product
          const deleteQuery = 'DELETE FROM bag_items WHERE product_id = ?';
          const deleteValues = [product_id];

          db.query(deleteQuery, deleteValues, (deleteErr) => {
            if (deleteErr) {
              console.error('Error deleting from bag_items table:', deleteErr);
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'Product removed from bag successfully' });
          });
        } else {
          // Update the quantity
          const updateQuery = 'UPDATE bag_items SET quantity = ? WHERE product_id = ?';
          const updateValues = [updatedQuantity, product_id];

          db.query(updateQuery, updateValues, (updateErr) => {
            if (updateErr) {
              console.error('Error updating bag_items table:', updateErr);
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'Product added to bag successfully' });
          });
        }
      } else {
        // Product doesn't exist, insert a new row
        const insertQuery = 'INSERT INTO bag_items (product_id, product_name, product_price, quantity, product_img) VALUES (?, ?, ?, ?, ?)';
        const insertValues = [product_id, product_name, product_price, quantity, product_img];

        db.query(insertQuery, insertValues, (insertErr) => {
          if (insertErr) {
            console.error('Error inserting into bag_items table:', insertErr);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          return res.status(200).json({ message: 'Product added to bag successfully' });
        });
      }
    });
  } catch (err) {
    console.error('Error adding product to bag:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/checkout', (req, res) => {
  try {
    // Perform checkout (delete all items from bag_items)
    const deleteAllItemsQuery = 'DELETE FROM bag_items';
    db.query(deleteAllItemsQuery, (deleteErr) => {
      if (deleteErr) {
        console.error('Error deleting all items from bag_items table:', deleteErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      return res.status(200).json({ message: 'Checkout successful' });
    });
  } catch (err) {
    console.error('Error during checkout:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



//create account
app.post("/create-user", (req, res) => {
  const { fname, lname, username, email, password, confirm_password } = req.body;

  // Check if any of the fields are empty
  if (!fname || !lname || !username || !email || !password || !confirm_password) {
    return res.status(400).json({ alert: "All fields are required" });
  }

  // Example: Check for a minimum password length
  const minPasswordLength = 8;
  if (password.length < minPasswordLength) {
    return res.status(400).json({ alert: `Password must be at least ${minPasswordLength} characters long` });
  }

  // Example: Check for a valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ alert: "Invalid email format" });
  }

  // Example: Check for a valid username format
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const minUsernameLength = 3;
  if (!usernameRegex.test(username) || username.length < minUsernameLength) {
    return res.status(400).json({ alert: `Invalid username format. Must be at least ${minUsernameLength} characters long and contain only letters, numbers, and underscores.` });
  }

  // Check if passwords match
  if (password !== confirm_password) {
    return res.status(400).json({ alert: "Passwords do not match" });
  }

  // Check if email already exists
  const checkEmailQuery = "SELECT * FROM customers WHERE email = ?";
  db.query(checkEmailQuery, [email], (emailErr, emailData) => {
    if (emailErr) {
      return res.status(500).json({ alert: emailErr.message });
    }

    if (emailData.length > 0) {
      // Email is already in use, send an alert
      return res.status(400).json({ alert: "Email is already in use" });
    }

    // If email is not in use and passwords match, proceed with user creation
    const insertUserQuery = "INSERT INTO customers(`fname`,`lname`,`username`,`email`,`password`,`confirm_password`) VALUES (?)";
    const values = [fname, lname, username, email, password, confirm_password];

    db.query(insertUserQuery, [values], (insertErr, insertData) => {
      if (insertErr) {
        return res.status(500).json({ alert: insertErr.message });
      }

      // Get the user ID after successful user creation
      const userId = insertData.insertId;

      // Log the user ID to the console
      console.log("User ID:", userId);

      return res.json({ alert: "Account created successfully" });
    });
  });
});




//login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Check if email and password match a user in the database
  const loginQuery = "SELECT id, email, category FROM customers WHERE email = ? AND password = ?";
  
  db.query(loginQuery, [email, password], (loginErr, loginData) => {
    if (loginErr) {
      return res.status(500).json(loginErr);
    }

    if (loginData.length === 0) {
      // No matching user found, send an alert
      return res.status(401).json("Invalid email or password");
    }

    // User successfully logged in, generate and send a token
    const user = loginData[0];
    const token = jwt.sign({ userId: user.id, email: user.email, category: user.category }, 'your_secret_key', { expiresIn: '1h' });

    return res.json({ token, userId: user.id, category: user.category });
  });
});
  


app.delete("/delete-product/:id", (req,res)=>{
    const prodId = req.params.id;
    const q = "DELETE FROM products WHERE id = ?"

    db.query(q,[prodId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Product has been deleted successfuly")
    })
})



app.put("/update/:id", (req,res)=>{
    const prodId = req.params.id;
    const q = "UPDATE products SET `prod_name` = ?,`prod_description` = ?,`prod_price` = ?,`prod_image` = ?,`category` = ? WHERE id = ?"

    const values = [
        req.body.prod_name,
        req.body.prod_description,
        req.body.prod_price,
        req.body.prod_image,
        req.body.category
    ]

    db.query(q,[...values,prodId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Product has been updated successfuly")
    })
})


app.listen(8800,()=>{
    console.log("connected to backend")
})