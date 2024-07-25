import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const LeadsListDetails = ({ lead }) => {
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
       await axios.delete('http://localhost:8080/leads/'  + lead._id, {
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
      <h4><strong>Name: </strong>{lead.name}</h4>
      <p><strong>Email: </strong>{lead.email}</p>
      <p><strong>Property Card IDs: </strong></p>
      <p>{lead.propertyCards.map((propertyCards, i) => {
        return <p>{propertyCards._id}</p>
      })}</p>
       {isLoggedIn && (
        <Link to={`/lead/update/${lead._id}`} className='editButton'><div className="material-symbols-outlined">edit</div> </Link>
      )}
      {isLoggedIn && (
        <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
      )}
    </div>
  )
}

export default LeadsListDetails