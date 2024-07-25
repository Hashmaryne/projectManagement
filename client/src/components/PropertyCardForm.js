import { useState, useEffect } from 'react'
import axios from 'axios';

const PropertyForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [community, setCommunity] = useState('');
  const [building, setBuilding] = useState('');
  const [unitNo, setUnitNo] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(community, building, unitNo);
    try {
      await axios.post('http://localhost:8080/property-cards/', {
        community,
        building,
        unitNo,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      setCommunity('');
      setBuilding('');
      setUnitNo('');
    } catch (error) {
      setError('Error creating property card');
    }
  }

  return (
    <div>
      {isLoggedIn && (
        <form className="create" onSubmit={handleSubmit}>
          <h2>Add a New Property</h2>

          <label>Unit Number:</label>
          <input
            type="text"
            onChange={(e) => setUnitNo(e.target.value)}
            value={unitNo}
          />

          <label>Community:</label>
          <input
            type="text"
            onChange={(e) => setCommunity(e.target.value)}
            value={community}
          />

          <label>Building:</label>
          <input
            type="text"
            onChange={(e) => setBuilding(e.target.value)}
            value={building}
          />

          <button>Add Property</button>
          {/* {error && <div className="error">{error}</div>} */}
        </form>
      )}

    </div>

  )
}

export default PropertyForm