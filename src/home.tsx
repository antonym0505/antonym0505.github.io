import { FC, MouseEvent, useCallback, useRef } from 'react'
import { Link } from 'react-router'
import ResumeDialog from './resume'

const Home: FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const timeout = useRef<number>()
  const copyEmailToClipboard = useCallback((e: MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText('brian@djerf.dev')
    const popover = e.currentTarget.querySelector<HTMLSpanElement>('.alert')
    if (popover) {
      clearTimeout(timeout.current)
      popover.hidden = false
      timeout.current = setTimeout(() => {
        popover.hidden = true
      }, 2000)
    }
  }, [])

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
          <dd>eai technologies</dd>
          <dd>software engineer</dd>
          <dd>2021 - present</dd>
          <dt>education</dt>
          <dd>tufts university</dd>
          <dd>computer science</dd>
          <dd>2015-2019</dd>
          <dt>contact</dt>
          <dd>
            <Link
              onClick={copyEmailToClipboard}
              to="mailto:brian@djerf.dev"
              style={{
                display: 'flex',
                font: 'inherit',
                alignItems: 'center',
                position: 'relative',
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
                brian@djerf.dev
              </span>
              <svg
                height={24}
                width={24}
                viewBox="0 -960 960 960"
                style={{ fill: 'currentcolor', flexShrink: 0 }}
              >
                <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
              </svg>
              <span className="alert" hidden>
                copied to clipboard
              </span>
            </Link>
          </dd>
          <dd>
            <Link
              to="https://www.linkedin.com/in/brian-djerf-9ab94a129"
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
                linkedin.com/in/brian-djerf-9ab94a129
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
          </dd>
          <dt />
        </dl>
        <Link
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            dialogRef.current?.showModal()
          }}
          target="_blank"
          to={new URL('resume.pdf', window.location.origin).toString()}
          style={{
            color: 'var(--primary)',
            padding: '0.5rem 1rem',
            width: 'fit-content',
          }}
        >
          view resume
        </Link>
      </article>
      <ResumeDialog ref={dialogRef} />
      <article>
        <h2>skills</h2>
        <dl>
          <dt>frontend</dt>
          <dd>
            <ul>
              <li>typescript</li>
              <li>react</li>
              <li>redux</li>
              <li>d3</li>
              <li>html/css</li>
            </ul>
          </dd>
          <dt>backend</dt>
          <dd>
            <ul>
              <li>java</li>
              <li>spring</li>
              <li>sql</li>
            </ul>
          </dd>
          <dt>testing</dt>
          <dd>
            <ul>
              <li>cypress</li>
              <li>jest/rtl</li>
              <li>selenium</li>
            </ul>
          </dd>
        </dl>
      </article>
    </main>
  )
}

export default Home
