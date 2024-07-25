import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LeadUpdateForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [propertyCards, setProperty] = useState('');
  const [error, setError] = useState('');
  const [propertyCardIds, setPropertyCardIds] = useState([]);
  const navigate = useNavigate();
  console.log(`Bearer ${localStorage.getItem('token')}`)
  const { id } = useParams();
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
        setName(response.data.name);
        setEmail(response.data.email)
        setProperty(response.data.propertyCards)
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchProperty();
  }, [id]);

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

    try {
      const response = await axios.put('http://localhost:8080/leads/' + id, {
        name,
        email,
        propertyCards
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
    <form className="create" onSubmit={handleSubmit}>
      <h3>Update a Property</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Email:</label>
      <input
        type="text"
        onChange={e => setEmail(e.target.value)}
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

      <button>Add Property</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default LeadUpdateForm