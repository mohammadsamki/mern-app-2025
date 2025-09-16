import Products from "../models/Products.js";

//  create crud for products model in node 
export const createProduct = async (req, res) => {
  const { name, description, price, images, category } = req.body;

  try {
    const newProduct = new Products({ name, description, price, images, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, images, category } = req.body;

  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { name, description, price, images, category },
      { new: true }
    ).populate('category');
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Products.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};