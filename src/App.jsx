import './App.css'
import {Outlet} from "react-router";
import Navigation from './components/Navigation'

function App() {
  return (
    <>
      <main>
        <Navigation></Navigation>
        <Outlet/>
      </main>
      <footer>
        moin
      </footer>
    </>
  )
}

export default App
