import { useEffect, useState } from 'react';
import axios from 'axios';
import UserCharts from '../components/UserCharts';

function BarChart() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/users')
      .then(res => setUsers(res.data.users))
      .catch(err => console.error('Failed to fetch user data', err));
  }, []);

  return (
    <div>
      <h1>User Analytics</h1>
      {users.length > 0 ? (
        <UserCharts users={users} />
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default BarChart;
