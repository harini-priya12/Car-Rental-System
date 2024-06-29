import Projects from './components/Projects'
import Groups from './components/Groups'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home';
import CreateProject from './components/CreateProject';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/projects",
      element: <Projects/>,
    },
    {
      path: "/groups",
      element: <Groups/>,
    },
    {
      path: "/projects/create",
      element: <CreateProject/>,
    },
    {
      path: "/projects/update/:id",
      element: <CreateProject/>,
    }
  ]);

  return (
    <>
      {/* create a navbar on the top containing the 
        tabs projects and groups */}
      <Navbar/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
