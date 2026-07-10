import { useState, useEffect } from 'react';
import { getRegistrations } from '../firebase/db';
import './Admin.css';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'echoes2025') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Could not fetch data. Check console.');
    }
    setLoading(false);
  };

  const filteredRegistrations = filter === 'All' 
    ? registrations 
    : registrations.filter(r => r.eventCategory === filter);

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <form onSubmit={handleLogin} className="admin-form">
          <h2 className="admin-title">ADMIN ACCESS</h2>
          <input 
            type="password" 
            placeholder="Enter Passcode" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input"
          />
          <button type="submit" className="admin-btn">ENTER</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h2>ECHOES / REGISTRATIONS</h2>
        <div className="admin-controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="admin-select">
            <option value="All">All Categories</option>
            <option value="Open Mic">Open Mic</option>
            <option value="Unplugged">Unplugged</option>
            <option value="Frame by Frame">Frame by Frame</option>
            <option value="Still Life">Still Life</option>
            <option value="Curtain Call">Curtain Call</option>
          </select>
          <button onClick={fetchData} className="admin-btn refresh-btn" disabled={loading}>
            {loading ? 'REFRESHING...' : 'REFRESH'}
          </button>
        </div>
      </header>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Name/Team</th>
              <th>Email</th>
              <th>College</th>
              <th>Details (Link/Title)</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map(reg => (
              <tr key={reg.id}>
                <td>{reg.registrationType}</td>
                <td>{reg.eventCategory}</td>
                <td>{reg.registrationType === 'Group' ? reg.teamName : reg.fullName}</td>
                <td>{reg.registrationType === 'Group' ? reg.leaderEmail : reg.email}</td>
                <td>{reg.registrationType === 'Group' ? '-' : reg.college}</td>
                <td>
                  {reg.eventCategory === 'Frame by Frame' || reg.eventCategory === 'Still Life' ? (
                    <a href={reg.fileLink} target="_blank" rel="noreferrer" className="admin-link">View File</a>
                  ) : reg.eventCategory === 'Curtain Call' ? (
                    reg.title
                  ) : '-'}
                </td>
              </tr>
            ))}
            {filteredRegistrations.length === 0 && (
              <tr>
                <td colSpan="6" style={{textAlign: 'center'}}>No registrations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
