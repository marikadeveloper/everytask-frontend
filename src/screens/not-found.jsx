import { Link } from '../components/lib';

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
        Sorry... nothing here. <Link to='/list'>Go home</Link>
      </div>
    </div>
  );
}

export { NotFoundScreen };
