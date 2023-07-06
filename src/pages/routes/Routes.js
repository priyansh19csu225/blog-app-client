import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import App from '../app/App';
import Header from '../../components/header/Header';
import URL from '../../constants/urls';
import CreateBlog from '../../components/createblog/CreateBlog';
import ShowBlog from '../../components/showblog/ShowBlog';

function RoutesComponent() {

  return (
      <BrowserRouter>
        <Header />
       <div style={{marginTop: 80}}>

          <Routes>
            <Route path={URL.HOME} element={<App />} />
            <Route path={URL.CREATE} element={<CreateBlog />} />
            <Route path={URL.BLOG} element={<ShowBlog />} />
            
          </Routes>
       </div>
      
      </BrowserRouter>

  );
}



export default RoutesComponent;
