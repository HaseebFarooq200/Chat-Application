import './App.css';
import Join from './components/join';
import Chat from './components/chat'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Join />} />
          <Route path='/Chat' element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
