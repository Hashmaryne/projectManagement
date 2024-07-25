import { useEffect, useState } from "react"
import LeadsListDetails from "../components/LeadsListDetails";
import LeadForm from "../components/LeadForm";

const Leads = () => {
    const [leads, setLeads] = useState(null);

    useEffect(() => {
        const fetchLeads = async () => {
            const response = await fetch('http://localhost:8080/leads')
            
            const json = await response.json()
            console.log(json)
            if (response.ok) {
                setLeads(json)
            }
        }

        fetchLeads()
    }, [])
    return (
        <div className="home">
            <div className="leads">
                {leads && leads.map(lead => (
                    <LeadsListDetails lead={lead} key={lead._id} />
                ))}
            </div>
            <LeadForm/>
        </div>
    )
}
export default Leads