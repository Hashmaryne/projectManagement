import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyCardDetails = ({ property }) => {
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleClick = async () => {
    console.log(`Bearer ${localStorage.getItem('token')}`);
    try {
      await axios.delete('http://localhost:8080/property-cards/' + property._id, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      window.location.reload();

    } catch (error) {
      setError('Error deleting lead');
    }
  }
  return (
    <div className="property-details">
      <h4><strong>Unit Number: </strong>{property.unitNo}</h4>
      <p><strong>Community: </strong>{property.community}</p>
      <p><strong>Building: </strong>{property.building}</p>
      {isLoggedIn && (
        <Link to={`/property/update/${property._id}`} className='editButton'><div className="material-symbols-outlined">edit</div> </Link>
      )}
      {isLoggedIn && (
        <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
      )}
    </div>
  )
}

export default PropertyCardDetails