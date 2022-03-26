import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Foother from "./components/Foother/Foother";
import Navbar from "./components/Navbar/Navbar";
import { API, config, setAuthToken,Socket} from "./config/API";
import Galerykegiatan from "./Pages/Galery/Galery-kegiatan";
import Galeryprestasi from "./Pages/Galery/Galeryprestasi";
import Home from "./Pages/Home/Home";
import Kontak from "./Pages/Kontak/Kontak";
import Login from "./Pages/login/login";
import MadrasahIbtidaiyah from "./Pages/Madrasah/MadrasahIbtidaiyah";
import MadrsahStanawiyah from "./Pages/Madrasah/MadrsahStanawiyah";
import Sejarah from "./Pages/Profile/Sejarah";
import Visimisi from "./Pages/Profile/Visimisi";
import Read from "./Pages/Read/Read";
import Smpi from "./Pages/Smpi/Smpi";
import Tk from "./Pages/TK/Tk";
import Uploads from "./Pages/Uploads/Uploads";
import Write from "./Pages/Write/Write";

const App=()=>{
  const [data, setdata] = useState();
  const [auth, setAuth] = useState(false);
  const [triger, setTriger] = useState(false);
  useEffect(()=>{
    Socket.on("connect", () => {
      if (localStorage.token) {
        Socket.emit("onSend-Data",{
            'reqto': 'sametokengenerate', 
            'endpoint': 'http://192.168.100.38:4008/be/v1/mansyuriyah/auth', 
            'method': 'GET',
            'body': "",
            'params': '',
            'auth': true,
            'headers': {"Authorization": "Bearer "+localStorage.token},
            "path":"/auth"
        })
    }

    Socket.emit("onSend-Data",{
      'reqto': 'sametokengenerate', 
      'endpoint': 'http://192.168.100.38:4008/be/v1/mansyuriyah/uploads/', 
      'method': 'GET',
      'body': "",
      'params': '',
      'auth': false,
      'headers': "",
      "path":"/uploads-GET"
    }) 
    Socket.on("res-"+Socket.id,(data)=>{
      if(data.path =="/auth"){
        if (data.status == 200){
          setAuth(true)
        }
      }else if(data.path == "/uploads-GET"){
        const newdata = JSON.parse(data.data)
        setdata(newdata.data)
      }
    })
    });
  },[])
  return data? (
    <div className="w-full">
      <Router>
        <div>
          <Navbar auth={auth} />
        </div>
        <div className="pt-32 w-12/12">
          <Switch>
            <Route exact path="/">
              <Home data={data} />
            </Route>
            <Route exact path="/sejarah" component={Sejarah} />
            <Route exact path="/visi-misi" component={Visimisi} />
            <Route exact path="/tk" component={Tk} />
            <Route exact path="/mi" component={MadrasahIbtidaiyah} />
            {/* <Route exact path="/mts" component={MadrsahStanawiyah}/> */}
            <Route exact path="/smpi" component={Smpi} />
            <Route exact path="/kontak" component={Kontak} />
            <Route exact path="/uploads">
              <Uploads
                auth={auth}
                foto={data}
                triger={triger}
                setTriger={setTriger}
              />
            </Route>
            <Route exact path="/login/admin" component={Login} />
            <Route exact path="/galery-kegiatan">
              <Galerykegiatan data={data} />
            </Route>
            <Route exact path="/galery-prestasi">
              <Galeryprestasi data={data} />
            </Route>
            <Route exact path="/write">
              <Write data={data} />
            </Route>
            <Route exact path="/read/:id" component={Read} />
          </Switch>
        </div>
      </Router>
      <div className="pt-44">
        <Foother />
      </div>
    </div>
  ) : (
    <p>Loading</p>
  );
}

export default App;
