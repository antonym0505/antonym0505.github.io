import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'
import { Link, Outlet } from 'react-router'

const DARK_MODE =
  'M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z'

const LIGHT_MODE =
  'M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z'

function App() {
  const drawerRef = useRef<HTMLElement>(null)
  const toggleDrawer = useCallback(() => {
    if (!drawerRef.current) return
    drawerRef.current.hidden = !drawerRef.current.hidden
  }, [])

  const [darkMode, setDarkMode] = useState(true)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])
  return (
    <>
      <header>
        <div className="app-bar">
          <button onClick={toggleDrawer}>
            <svg height={24} width={24} viewBox="0 -960 960 960">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
          <Link to="/">
            <svg height={28} width={28} viewBox="0 -960 960 960">
              <text fontFamily="moby" fontSize={512} y={-320}>
                bd
              </text>
            </svg>
          </Link>
        </div>
        <button className=".theme" onClick={() => setDarkMode((d) => !d)}>
          <svg height={24} width={24} viewBox="0 -960 960 960">
            <path d={darkMode ? DARK_MODE : LIGHT_MODE} />
          </svg>
        </button>
      </header>
      <nav ref={drawerRef} hidden>
        <div className="app-bar">
          <Link to="/">
            <svg height={28} width={28} viewBox="0 -960 960 960">
              <text fontFamily="moby" fontSize={512} y={-320}>
                bd
              </text>
            </svg>
          </Link>
          <button onClick={toggleDrawer}>
            <svg height={24} width={24} viewBox="0 -960 960 960">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        {/* <a href="https://briandjerf.com/about">about</a> */}
        {/* <a href="https://briandjerf.com/contact">contact</a> */}
        <p>frontend playground</p>
        <Link to="tee-times">tee times</Link>
        <p>full stack projects</p>
        <Link
          to="https://intermodal-frontend-production.up.railway.app"
          target="_blank"
          style={{
            display: 'flex',
            font: 'inherit',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            intermodal
          </span>
          <svg
            height={24}
            width={24}
            viewBox="0 -960 960 960"
            style={{ fill: 'currentcolor', flexShrink: 0 }}
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
          </svg>
        </Link>
        <p>more soon...</p>
      </nav>
      <Outlet />
    </>
  )
}

export default App
