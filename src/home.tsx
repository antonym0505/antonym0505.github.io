import {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from 'react'

const Home: FC = () => {
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
  )
}

export default Home
