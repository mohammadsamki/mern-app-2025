
import axios from "axios";
import { useEffect, useState } from "react";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Fetched cart items:', response.data);
                setCartItems(response.data);
            } catch (err) {
                setError('Error fetching cart items');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    if (loading) return <p>Loading cart...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems[0].items.map((item) => (
                        
                        <li key={item._id}>
                            {item.product.name} | Quantity: {item.quantity} | Price: ${item.product.price * item.quantity}
                           
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}