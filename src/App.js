import './App.css';
import CustomerPage from './Pages/CustomerPage';
import HomePage from './Pages/HomePage';
import Navbar from './components/Navbar';
import InvoicePage from "./Pages/InvoicePage";
import { HashRouter,Routes ,Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';


function App() {
  return (
    <HashRouter>
    <Navbar/>
    <div className="container">

      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/customers' element={<CustomerPage/>}></Route>
        <Route path='/invoices' element={<InvoicePage/>}></Route>
        <Route path='/' element={<HomePage/>}></Route>
      </Routes>

    </div>
    
    </HashRouter>
  );
}

export default App;
