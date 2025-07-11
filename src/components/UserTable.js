import { useEffect, useState } from 'react';
import axios from 'axios';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://reqres.in/api/users')
      .then(response => {
        setUsers(response.data.data);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <table border="1" cellPadding="10">
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.first_name} {user.last_name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
