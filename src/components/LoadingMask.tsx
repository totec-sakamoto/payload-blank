/**
 * LoadingMask component.
 * Displays a fullscreen loading spinner and message.
 */

export default function LoadingMask() {
  return (
    <div className='fixed top-0 z-50 flex h-screen w-screen flex-wrap place-content-center bg-stone-100'>
      <div className='text-center'>
        <span className='loading loading-ring loading-md'></span>
        <span className='block'>Thanks for your patience.</span>
      </div>
    </div>
  )
}
