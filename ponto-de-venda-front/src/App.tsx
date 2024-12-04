import './App.css'
import SwitchableListCard from './components/switchable/switchable-list-card'

function App() {

  return (
     <div className="flex flex-col items-center gap-12">
      <h1 className='text-3xl'>Ponto de venda</h1>
      <SwitchableListCard />
     </div>
  )
}

export default App
