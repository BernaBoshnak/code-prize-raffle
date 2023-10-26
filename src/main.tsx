import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './components/store/AuthContext.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>,
)
