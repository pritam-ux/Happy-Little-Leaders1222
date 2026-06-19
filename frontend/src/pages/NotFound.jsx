import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="section py-24 text-center">
      <div className="text-7xl mb-4">🧸</div>
      <h1 className="heading text-4xl">Oops, page not found</h1>
      <p className="text-ink/70 mt-3">Looks like this little path doesn't lead anywhere.</p>
      <Link to="/" className="btn-primary mt-6">Take me home</Link>
    </div>
  );
}
