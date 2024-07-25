import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PropertyUpdateForm = () => {
  const [community, setCommunity] = useState('');
  const [building, setBuilding] = useState('');
  const [unitNo, setUnitNo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get('http://localhost:8080/leads/' + id, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response)
        setCommunity(response.data.community);
        setBuilding(response.data.building)
        setUnitNo(response.data.unitNo)
      } catch (error) {
        console.error('Error fetching property cards:', error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.put('http://localhost:8080/leads/' + id, {
        community,
        building,
        unitNo
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      navigate('/');

    } catch (error) {
      setError('Error creating property card');
    }

  }

  return (
    <div>
      {isLoggedIn && (
        <form className="create" onSubmit={handleSubmit}>
          <h2>Update a Property</h2>

          <label>Unit Number:</label>
          <input
            type="text"
            onChange={(e) => setUnitNo(e.target.value)}
            value={unitNo}
          />

          <label>Community:</label>
          <input
            type="text"
            onChange={e => setCommunity(e.target.value)}
            value={community}
          />

          <label>Building:</label>
          <input
            type="text"
            onChange={e => setBuilding(e.target.value)}
            value={building}
          />

          <button>Add Property</button>
          {/* {error && <div className="error">{error}</div>} */}
        </form>
      )}

    </div>

  )
}

export default PropertyUpdateForm