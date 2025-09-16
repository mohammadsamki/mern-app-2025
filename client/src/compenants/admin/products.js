import React,{useState,useEffect} from 'react';
import axios from 'axios';
export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products');
        setProducts(response.data);
        console.log('Fetched products:', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/categories');
        setCategories(response.data);
        console.log('Fetched categories:', response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    var newProduct = {
        name: productName,
        description: productDescription,
        image: productImage,
        price: productPrice,
        category: productCategory
    }
    console.log('Submitting new product:', newProduct);
    try {
        const token = localStorage.getItem('token'); // only token; NOT role
      const response = await axios.post('http://localhost:4000/api/products', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      <p>Manage your products here.</p>
      {/* form to create new product  */}
      <form onSubmit={handleSubmit}>
        <input onChange={(e)=>setProductName(e.target.value)} type="text" placeholder="Product Name" />
        <input onChange={(e)=>setProductDescription(e.target.value)} type="text" placeholder="Product Description" />
        <input onChange={(e)=>setProductImage(e.target.value)} type="text" placeholder="Image URL" />
        <input onChange={(e)=>setProductPrice(e.target.value)} type="number" placeholder="Price" />
        <select onChange={(e)=>setProductCategory(e.target.value)} >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Product</button>
      </form>

        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => (
                <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>
                        <img src={product.image} alt={product.name} style={{ width: '100px' }} />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  );
}

