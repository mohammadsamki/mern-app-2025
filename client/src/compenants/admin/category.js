import React,{useState,useEffect} from 'react';
import axios from 'axios';
export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/categories');
        setCategories(response.data);
        console.log('Fetched categories:', response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    var newCategory = {
        name: categoryName,
        description: categoryDescription,
        image: categoryImage
    }
    console.log('Submitting new category:', newCategory);
    try {
        const token = localStorage.getItem('token'); // only token; NOT role
      const response = await axios.post('http://localhost:4000/api/categories', newCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories((prevCategories) => [...prevCategories, response.data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <h2>Category Management</h2>
      <p>Manage your categories here.</p>
      {/* form to crete new category  */}
      <form onSubmit={handleSubmit}>
        <input onChange={(e)=>setCategoryName(e.target.value)} type="text" placeholder="Category Name" />
        <input onChange={(e)=>setCategoryDescription(e.target.value)} type="text" placeholder="Category Description" />
        <input onChange={(e)=>setCategoryImage(e.target.value)} type="text" placeholder="Image URL" />
        <button type="submit">Add Category</button>
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
            {categories.map((category) => (
                <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                        <img src={category.image} alt={category.name} style={{ width: '100px' }} />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  );
}

