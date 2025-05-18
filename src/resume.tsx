import { forwardRef, useImperativeHandle, useRef } from 'react'
import useOutsideClickHandler from './tee-times/filters/use-outside-click'

const ResumeDialog = forwardRef<Pick<HTMLDialogElement, 'showModal'>>(
  (_, forwardedRef) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const objectRef = useRef<HTMLEmbedElement>(null)

    useImperativeHandle(
      forwardedRef,
      () => ({ showModal: () => dialogRef.current?.showModal() }),
      []
    )

    useOutsideClickHandler(objectRef, () => dialogRef.current?.close())

    return (
      <dialog ref={dialogRef}>
        <embed
          ref={objectRef}
          src="src/resume-2024-05-19.pdf"
          type="application/pdf"
          height={window.innerHeight}
          width="100%"
        />
      </dialog>
    )
  }
)

export default ResumeDialog
