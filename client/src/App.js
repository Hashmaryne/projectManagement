import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/HomePage'
import Navbar from './components/Navbar'
import Login from './components/LoginForm';
import Leads from './pages/LeadPage';
import PropertyUpdateForm from './components/PropertyCardUpdateForm';
import LeadUpdateForm from './components/LeadsUpdateForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/property/update/:id" element={<PropertyUpdateForm/>}></Route>
            <Route path="/lead/update/:id" element={<LeadUpdateForm/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
