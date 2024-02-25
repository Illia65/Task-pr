import { Route, Routes } from 'react-router-dom'
import CardDetail from './components/pages/CardDetail/CardDetail'
import Cards from './components/pages/Cards/Cards'
import Home from './components/pages/Home/Home'

function App() {
	return (
		<Routes>
			<Route path='*' element={<Home />} />
			<Route path='/cards' element={<Cards />} />
			<Route path='/card/:id' element={<CardDetail />} />
		</Routes>
	)
}

export default App
