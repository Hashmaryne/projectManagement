import { useEffect, useState } from "react"
import PropertyCardDetails from "../components/ProperyCardDetails";
import PropertyForm from "../components/PropertyCardForm";
import axios from "axios";

const Home = () => {
    const [properties, setProperties] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
          try {
            const response = await axios.get('http://localhost:8080/property-cards');
            setProperties(response.data);
          } catch (error) {
            console.error('Error fetching property cards:', error);
          }
        };
    
        fetchProperties();
      }, []);
    return (
        <div className="home">
            <div className="properties">
                {properties && properties.map(property => (
                    <PropertyCardDetails property={property} key={property._id} />
                ))}
            </div>
            <PropertyForm />
        </div>
    )
}
export default Home