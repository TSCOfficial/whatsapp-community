import './App.css'
import {Outlet} from "react-router";
import { StyledEngineProvider } from '@mui/material/styles';
import Navigation from './components/Navigation'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <main>
        <Navigation></Navigation>
        <Outlet/>
      </main>
      <footer>
        moin
      </footer>
    </StyledEngineProvider>
  )
}

export default App
