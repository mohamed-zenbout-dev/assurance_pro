import { useEffect, useState } from 'react';
import api from '../services/api';

function Contracts() {
  const [contracts, setContracts] = useState([]);

  console.log(api);
  
  useEffect(() => {
    api.get('/contracts')
      .then((response) => setContracts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Mes Contrats</h2>

      <ul className="list-group mt-4">
        {contracts.map((contract) => (
          <li key={contract.id} className="list-group-item">
            {contract.contractNumber} - {contract.insuranceType}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contracts;