import { Link } from '../components/link.jsx';

function NotFoundScreen() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      <div>
        Sorry... nothing here. <Link to='/'>Go home</Link>
      </div>
    </div>
  );
}

export { NotFoundScreen };
