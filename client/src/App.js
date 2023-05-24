import './App.css';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form';
import Error from './components/Error/Error';
import Loading from './components/Loading/Loading';
import { useEffect,useState } from 'react';
import { Routes, Route, useLocation  } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import {getAllVideogames,getVideogameByName,getAllGenres} from './redux/actions'

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'
///axios.defaults.baseURL = 'https://videogames-pi-production-91ab.up.railway.app'

function App() {
  const dispatch = useDispatch();
  const {allVideogames} = useSelector(state => state)

  useEffect(() => {
      dispatch(getAllVideogames())
      dispatch(getAllGenres())
  }, [dispatch]);

  const onSearch =  (name) => {
    dispatch(getVideogameByName(name))
  }

  const [showLoading, setShowLoading] = useState(false);
  const location = useLocation();

useEffect(() => {
    if (location.pathname === "/home" ) {
          setShowLoading(true);
          const timer = setTimeout(() => {
          setShowLoading(false);
          }, 5000);
  
          return () => {
          clearTimeout(timer);
          };
      }
      }, [allVideogames]);



  return (
    <div className="App">
      {showLoading && <Loading/>}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home onSearch={onSearch}/>} />
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path='/create' element={<Form/>}/>
        <Route path=':error' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
