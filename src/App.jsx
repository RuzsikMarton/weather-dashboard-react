import { Routes , Route } from 'react-router-dom'
import Home from './components/Home'
import Forecast from './components/Forecast'

function App() {

  return (
    <main>
      <Routes> 
            <Route path='/' element={<Home />}/>
            <Route path='/forecast/:city' element={<Forecast />} />
        </Routes>
    </main>
  )
}

export default App
