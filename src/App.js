import routes from './routes';
import './App.css';
import NavBar from './components/NavBar';
import { useRoutes,Navigate } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footerrr'
import { UserProvider } from './components/UserContext';
import { useUserContext } from './components/UserContext';
function App() {
  let router = useRoutes(routes)

 
  return (
    <UserProvider>
    <div className="App">
    <NavBar/>
    {router}
    <Footer></Footer>
    </div>
    </UserProvider>
  );
}

export default App;















// import routes from './routes';
// import './App.css';
// import NavBar from './components/NavBar';
// import { useRoutes } from 'react-router-dom';
// import Header from './components/Header'
// import Footer from './components/Footerrr'

// function App() {
//   let router = useRoutes(routes)
//   return (
//     <div className="App">
//     <NavBar/>
//     {router}
//     <Footer></Footer>
//     </div>
//   );
// }

// export default App;
