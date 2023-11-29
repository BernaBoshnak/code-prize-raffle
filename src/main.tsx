import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@components/App'
import AuthContextProvider from '@components/store/AuthContext'
import TokenValidationContextProvider from '@components/store/TokenValidationContext'
import UserContextProvider from '@components/store/UserContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter>
      <TokenValidationContextProvider>
        <AuthContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </AuthContextProvider>
      </TokenValidationContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
