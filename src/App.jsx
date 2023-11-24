import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './components/Details';
import Home from './components/Home';
import MovieGrid from './components/MovieGrid';
import Popular from './components/Popular';
import Search from './components/Search';
import './index.css';
function App() {

  return (
    
    <div className='w-full flex justify-center'>
      <div className='max-w-[1100px] '>

      <div className='text-4xl text-center py-1' style={{ color: 'white', backgroundColor: 'black' }}><h2>The Movie Database</h2>
  
</div>

        <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Home

term={''}
/>}/>
<Route path='/details' exact element={<Details/>}/>
<Route path='/moviegrid' exact element={<MovieGrid/>}/>
<Route path='/popular' exact element={<Popular/>}/>
<Route path='/search' exact element={<Search/>}/>
        </Routes>
</BrowserRouter>
      </div>
      </div>
   
  );
}

export default App;
