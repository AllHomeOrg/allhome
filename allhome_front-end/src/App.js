import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/my-cart'/>
          <Route path='/product-pages'/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
