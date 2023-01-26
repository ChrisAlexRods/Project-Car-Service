import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './ManufacturerForm'
import ManufacturerList from './ManufacturerList'
import ModelForm from './ModelForm'
import ModelList from './ModelList'
import SalesPersonForm from './SalesPersonForm';
import AutomobileForm from './AutomobileForm';
import AutomobilesList from './AutomobilesList';
import TechnicianForm from './TechnicianForm';
import CustomerForm from './CustomerForm';
import SalesRecordForm from './SalesRecordForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/ManufacturerForm" element={<ManufacturerForm />} />
          <Route path="/ManufacturerList" element={<ManufacturerList />} />
          <Route path="/ModelForm" element={<ModelForm />} />
          <Route path="/ModelList" element={<ModelList />} />
          <Route path="/AutomobilesList" element={<AutomobilesList />} />
          <Route path="/AutomobileForm" element={<AutomobileForm />} />
          <Route path="/SalesPersonForm" element={<SalesPersonForm />} />
          <Route path="/TechnicianForm" element={<TechnicianForm />} />
          <Route path="/CustomerForm" element={<CustomerForm />} />
          <Route path="/SalesRecordForm" element={<SalesRecordForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
