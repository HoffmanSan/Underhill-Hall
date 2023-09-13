// Imports
import { Link } from 'react-router-dom';

// Styles
import './notFound.scss';

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>404 PAGE NOT FOUND</h2>
      <p>It seems you tried navigating to a page that doesn't exist...</p>
      <p>...or it could be us.</p>
      <p>Either way, you should probably go back to the <Link to="/">HOME PAGE</Link> </p>
    </div>
  )
}
