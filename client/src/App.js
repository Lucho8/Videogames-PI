import './App.css';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form';
import Error from './components/Error/Error';
import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {getAllVideogames,getVideogameByName,getAllGenres} from './redux/actions'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getAllVideogames())
      dispatch(getAllGenres())
  }, [dispatch]);

  const onSearch =  (name) => {
    dispatch(getVideogameByName(name))
  }


  return (
    <div className="App">
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
