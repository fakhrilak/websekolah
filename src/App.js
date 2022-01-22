import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Foother from './components/Foother/Foother';
import Navbar from "./components/Navbar/Navbar";
import { API, config, setAuthToken } from './config/API';
import Galerykegiatan from './Pages/Galery/Galery-kegiatan';
import Galeryprestasi from './Pages/Galery/Galeryprestasi';
import Home from "./Pages/Home/Home";
import Kontak from './Pages/Kontak/Kontak';
import Login from './Pages/login/login';
import MadrasahIbtidaiyah from './Pages/Madrasah/MadrasahIbtidaiyah';
import MadrsahStanawiyah from './Pages/Madrasah/MadrsahStanawiyah';
import Sejarah from './Pages/Profile/Sejarah';
import Visimisi from './Pages/Profile/Visimisi';
import Tk from './Pages/TK/Tk';
import Uploads from './Pages/Uploads/Uploads';
function App() {
  const [data,setdata] = useState()
  const [auth,setAuth] = useState(false)
  useEffect(()=>{
    if (localStorage.token) {
      setAuthToken(localStorage.getItem('token'))
      API.get("/auth")
      .then((res)=>{
          setAuth(true)
      })
      .catch((err)=>{
        alert(err.response.data.message)
      })
    }
    API.get("/uploads",config)
    .then((res)=>{
       setdata(res.data.data)
    })
    .catch((err)=>{
      alert("please contact developer")
    })
  },[])
  return data ? (
      <div className="w-full">
      <Router>
            <div>
              <Navbar auth={auth}/>
            </div>
            <div>
              <Switch>
                <Route exact path="/">
                    <Home data={data}/>
                </Route>
                <Route exact path="/sejarah" component={Sejarah}/>
                <Route exact path="/visi-misi" component={Visimisi}/>
                <Route exact path="/tk" component={Tk}/>
                <Route exact path="/mi" component={MadrasahIbtidaiyah}/>
                <Route exact path="/mts" component={MadrsahStanawiyah}/>
                <Route exact path="/kontak" component={Kontak}/>
                <Route exact path="/uploads">
                  <Uploads auth={auth}/>
                </Route>
                <Route exact path="/login/admin" component={Login}/>
                <Route exact path="/galery-kegiatan">
                    <Galerykegiatan data={data}/>
                </Route>
                <Route exact path="/galery-prestasi">
                    <Galeryprestasi data={data}/>
                </Route>
              </Switch>
              
            </div>
        </Router>
        <div className='pt-44'>
          <Foother/>
        </div>
      </div>
   
  ):(<p>Loading</p>);
}

export default App;
