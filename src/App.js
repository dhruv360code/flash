
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Card from './components/card/Card';
import View from './components/view/view';
import Form from "./components/form/Form";
function App() {
  return (
   <>
  <BrowserRouter>
  <Routes>
    
    <Route path="/" exact element={<Navbar/>}></Route>
    <Route path="/view" exact element={<Card/>}></Route>
    <Route path="/add" exact element={<Form/>}></Route>
    <Route path="/cardview/:id" exact element={<View/>} />

  </Routes>
  </BrowserRouter>
   </>
  );
}

export default App;
