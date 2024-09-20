import NavBar from '../components/NavBar'

import MainComponent from '../components/MainComponent'

function HomePage() {
  return (
    <div className='p-2 bg-yellow-50 min-h-screen'>
      <NavBar/>  
      <MainComponent/>
    </div>
  )
}

export default HomePage
