import { Link } from 'react-router-dom';

function DashboardClient() {
  return (
    <div className="container mt-5">
      <h2>Tableau de bord Client</h2>

      <div className="d-flex gap-3 mt-4">
        <Link to="/contracts" className="btn btn-success">
          Mes Contrats
        </Link>

        <Link to="/claims" className="btn btn-warning">
          Mes Sinistres
        </Link>
      </div>
    </div>
  );
}

export default DashboardClient;