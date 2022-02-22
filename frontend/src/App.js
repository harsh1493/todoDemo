import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home1 from './components/Home1';
import TodoState from './context/Notes/TodoState';
function App() {
  return (
  
 
        <TodoState>
            <BrowserRouter>
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home1/>} />
                </Routes>
              </div>
            </BrowserRouter>
        </TodoState>
  );
}

export default App;
