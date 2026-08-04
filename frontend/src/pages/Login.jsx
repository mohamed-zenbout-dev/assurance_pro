import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Connexion avec :', email, password);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/login_check',
        {
          email: email.trim(),
          password: password.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Réponse :', response.data);

      localStorage.setItem('token', response.data.token);

      alert('Connexion réussie !');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur complète :', error);
      console.error('Réponse serveur :', error.response?.data);
      alert('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Connexion</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3"
        />

        <button type="submit" className="btn btn-primary">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;