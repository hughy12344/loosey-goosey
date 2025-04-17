// Import libraries and components
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Initiliase the react app by rendering it to the root element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter enables client-side routing for the app */}
    <BrowserRouter>
      {/* Main App component that will render the app's UI */}
      <App />
    </BrowserRouter>
  </StrictMode>
)
