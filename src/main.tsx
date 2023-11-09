import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './components/store/AuthContext.tsx'
import TokenValidationContextProvider from './components/store/TokenValidationContext.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <TokenValidationContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </TokenValidationContextProvider>
  </BrowserRouter>,
)
