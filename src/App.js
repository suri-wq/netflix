import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviePage from './pages/Movies/MoviePage';
import NotFoundPage from './NotFoundPage/NotFoundPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/Login/LoginPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<Homepage/>}/>
          <Route path="movies">
            <Route index element={<MoviePage/>}/>
            <Route path=":id" element={<MovieDetailPage/>}/>
            
          </Route>
          <Route path="login" element={<LoginPage/>}/>

        </Route>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}


export default App;
