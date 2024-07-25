import { useState, useEffect } from 'react'
import axios from 'axios';

const LeadForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [propertyCards, setProperty] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [propertyCardIds, setPropertyCardIds] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchPropertyCardIds = async () => {
      try {
        const response = await axios.get('http://localhost:8080/property-cards/getIds');
        setPropertyCardIds(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchPropertyCardIds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(propertyCards);
    try {
      await axios.post('http://localhost:8080/property-cards/', {
        name,
        email,
        propertyCards
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      setName('');
      setEmail('')
      setProperty('')
    } catch (error) {
      setError('Error creating property card');
    }
  }

  return (
    <div>
      {isLoggedIn && (
        <form className="create" onSubmit={handleSubmit}>
          <h2>Add a New Lead</h2>

          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <label>Email:</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label>Property ID:</label>
          <select onChange={(e) => setProperty(e.target.value)}> 
            <option value="" >Select an ID</option>
            {propertyCardIds.map((propertyCard) => (
              <option key={propertyCard._id} value={propertyCard._id} >
                {propertyCard._id}
              </option>
            ))}
          </select>

          <button>Add Lead</button>
          {/* {error && <div className="error">{error}</div>} */}
        </form>
      )}

    </div>

  )
}

export default LeadForm