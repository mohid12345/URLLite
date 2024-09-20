import { BrowserRouter } from 'react-router-dom'

import UserRouter from './routes/UserRouter'
import { Provider } from 'react-redux'
import store from './Redux/store'



function App() {
  
  return (
    <> 
     <Provider store={store}>
      <BrowserRouter>
        <UserRouter/>
      </BrowserRouter>
      </Provider> 
    </>
  )
}

export default App
