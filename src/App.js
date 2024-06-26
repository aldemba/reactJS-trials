import './App.css';
import CustomerPage from './Pages/CustomerPage';
import HomePage from './Pages/HomePage';
import Navbar from './components/Navbar';
import { HashRouter,Routes ,Route} from 'react-router-dom';


function App() {
  return (
    <HashRouter>
    <Navbar/>
    <div className="container">

      <Routes>
        <Route path='/customers' element={<CustomerPage/>}></Route>
        <Route path='/' element={<HomePage/>}></Route>
      </Routes>

    </div>
    
    </HashRouter>
  );
}

export default App;
