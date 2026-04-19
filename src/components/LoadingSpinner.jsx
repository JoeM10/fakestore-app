export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="loading-spinner-wrapper">
      <div className="spinner" aria-hidden="true"></div>
      <p className="loading-text">{label}</p>
    </div>
  )
}
