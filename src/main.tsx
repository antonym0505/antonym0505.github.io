import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router'

import App from './App.tsx'
import Home from './home.tsx'
import './index.css'
import { TeeTimeProvider } from './tee-times/tee-time-context.tsx'
import { TeeTimeTable } from './tee-times/tee-times.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="tee-times" element={<TeeTimeProvider />}>
          <Route index element={<TeeTimeTable />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
)
