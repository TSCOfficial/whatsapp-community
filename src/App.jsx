import './App.css'
import {Outlet} from "react-router";
import Navigation from './components/Navigation'

function App() {
  return (
    <>
      <Navigation></Navigation>
      <main>
        <Outlet/>
      </main>
      <footer>
        moin
      </footer>
    </>
  )
}

export default App
