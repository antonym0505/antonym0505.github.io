import {
  useCallback,
  useRef,
  MouseEvent,
  useState,
  ChangeEvent,
  useEffect,
} from 'react'
import './App.css'

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

  const openLinkedIn = useCallback(() => {
    window.open('https://www.linkedin.com/in/brian-djerf-9ab94a129', '_blank')
  }, [])

  const timeout = useRef<number>()
  const copyEmailToClipboard = useCallback(
    (e: MouseEvent<HTMLLabelElement>) => {
      navigator.clipboard.writeText('brian@djerf.dev')
      const popover = e.currentTarget.querySelector('span')
      if (popover) {
        clearTimeout(timeout.current)
        popover.hidden = false
        timeout.current = setTimeout(() => {
          popover.hidden = true
        }, 2000)
      }
    },
    []
  )

  const [charactedCount, setCharactedCount] = useState(0)
  const handleMessageChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCharactedCount(e.target.textLength)
    },
    [setCharactedCount]
  )
  return (
    <>
      <header>
        <div className="app-bar">
          <button onClick={toggleDrawer}>
            <svg height={24} width={24} viewBox="0 -960 960 960">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
          <a>
            <svg height={28} width={28} viewBox="0 -960 960 960">
              <text fontFamily="moby" fontSize={512} y={-320}>
                bd
              </text>
            </svg>
          </a>
        </div>
        <button className=".theme" onClick={() => setDarkMode((d) => !d)}>
          <svg height={24} width={24} viewBox="0 -960 960 960">
            <path d={darkMode ? DARK_MODE : LIGHT_MODE} />
          </svg>
        </button>
      </header>
      <nav ref={drawerRef} hidden>
        <div className="app-bar">
          <a>
            <svg height={28} width={28} viewBox="0 -960 960 960">
              <text fontFamily="moby" fontSize={512} y={-320}>
                bd
              </text>
            </svg>
          </a>
          <button onClick={toggleDrawer}>
            <svg height={24} width={24} viewBox="0 -960 960 960">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        {/* <a href="https://briandjerf.com/about">about</a> */}
        {/* <a href="https://briandjerf.com/contact">contact</a> */}
        <a href="">more soon...</a>
      </nav>
      <main>
        <section className="general">
          <h1>brian djerf</h1>
          <div className="details">
            <p>web developer</p>
            <p>boston, mass</p>
          </div>
        </section>
        <article>
          <h2>about</h2>
          <dl>
            <dt>experience</dt>
            <dd>
              eai technologies
              {/* <a href="https://www.eaiti.com">eai technologies</a> */}
            </dd>
            <dd>software engineer</dd>
            <dd>2021 - present</dd>
            <dt>education</dt>
            <dd>
              tufts university
              {/* <a href="https://engineering.tufts.edu/cs">tufts university</a> */}
            </dd>
            <dd>computer science</dd>
            <dd>2015-2019</dd>
            <dt>skills</dt>
            <dd>typescript&bull;react&bull;jest/rtl</dd>
            <dd>java&bull;spring&bull;sql&bull;selenium</dd>
            <dd>html&bull;css/scss&bull;material</dd>
            <dt />
            {/* <dd>
              <a href="">view full resume</a>
            </dd> */}
          </dl>
        </article>
        <article>
          <h2>contact</h2>
          <form>
            <label onClick={openLinkedIn}>
              me
              {/* https://www.linkedin.com/in/brian-djerf-9ab94a129 */}
              <input
                type="text"
                defaultValue="linkedin.com/in/brian-djerf-9ab94a129"
                readOnly
              />
              <svg height={24} width={24} viewBox="0 -960 960 960">
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
              </svg>
            </label>
            <label onClick={copyEmailToClipboard}>
              me
              <input type="email" defaultValue="brian@djerf.dev" readOnly />
              <svg focusable height={24} width={24} viewBox="0 -960 960 960">
                <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
              </svg>
              <span className="alert" hidden>
                copied to clipboard
              </span>
            </label>
            <label>
              you
              <input type="text" placeholder="name" required />
            </label>
            <label>
              you
              <input type="email" placeholder="email" required />
            </label>
            <label>
              you
              <textarea
                placeholder="message"
                maxLength={256}
                rows={8}
                required
                onChange={handleMessageChange}
              />
              <span className="character-count">{charactedCount}/256</span>
            </label>
            <button type="submit" disabled>
              <svg height={24} width={24} viewBox="0 -960 960 960">
                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
              </svg>
            </button>
            <span>jk no email server</span>
          </form>
        </article>
      </main>
    </>
  )
}

export default App
