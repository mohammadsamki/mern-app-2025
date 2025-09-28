
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
// import cart icon from mui
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [cartQuantity, setCartQuantity] = useState(0);
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
    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Fetched cart items:', response.data);
            if(response.data.length > 0){
                const totalQuantity = response.data[0].items.reduce((sum, item) => sum + item.quantity, 0);
                setCartQuantity(totalQuantity);
            }else{
                setCartQuantity(0);
            }
        } catch (err) {
            console.error('Error fetching cart items:', err);
        }
    };
  useEffect(() => {

    fetchCart();

    fetchProducts();
    fetchCategories();
  }, []);


const changeQuantity = (e) => {

    console.log('Selected quantity:', e.target.value);
    setSelectedQuantity(e.target.value);
}
const handleAddToCart = async (productId) => {
console.log('Adding to cart:', productId, 'Quantity:', selectedQuantity);
await fetchCart();
try {
    var cartItem = {
        productId: productId,
        quantity: parseInt(selectedQuantity)
    }
    const token = localStorage.getItem('token'); // only token; NOT role
    const response = await axios.post('http://localhost:4000/api/cart/add', cartItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Added to cart:', response.data);
      if(response.data ){
                const totalQuantity = response.data.items.reduce((sum, item) => sum + item.quantity, 0);
                setCartQuantity(totalQuantity);
            }else{
                setCartQuantity(0);
            }
} catch (error) {
    console.error('Error adding to cart:', error.message);
    
}
}

  return (
    <div>
        <Link to="/cart">Go to Cart <ShoppingCartIcon /> {cartQuantity}</Link>
      <h2>Product Management</h2>
      <p>Manage your products here.</p>
      {/* form to create new product  */}
     

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
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
                    </td>
                    <td>
                        <select onChange={changeQuantity}>
                            <option value="">Select Quantity</option>
                            {[1, 2, 3, 4, 5].map((qty) => (
                                <option key={qty} value={qty}>
                                    {qty}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => handleAddToCart(product._id)} >Add to cart </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  );
}

