import { forwardRef, useImperativeHandle, useRef } from 'react'
import useOutsideClickHandler from './tee-times/filters/use-outside-click'

const ResumeDialog = forwardRef<Pick<HTMLDialogElement, 'showModal'>>(
  (_, forwardedRef) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const embedRef = useRef<HTMLEmbedElement>(null)

    useImperativeHandle(
      forwardedRef,
      () => ({ showModal: () => dialogRef.current?.showModal() }),
      []
    )

    useOutsideClickHandler(embedRef, () => dialogRef.current?.close())

    return (
      <dialog ref={dialogRef}>
        <embed
          ref={embedRef}
          src="/resume.pdf"
          type="application/pdf"
          height={window.innerHeight - 100}
          width={window.innerWidth - 100}
        />
      </dialog>
    )
  }
)

export default ResumeDialog
