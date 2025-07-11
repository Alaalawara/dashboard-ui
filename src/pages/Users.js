import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUsers = (pageNumber) => {
    setLoading(true);
    axios.get(`https://reqres.in/api/users?page=${pageNumber}`, {
      headers: { 'x-api-key': 'reqres-free-v1' }
    })
      .then(res => {
        setUsers(res.data.data);
        setTotalPages(res.data.total_pages);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const nextPage = () => setPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage(prev => Math.max(prev - 1, 1));

  return (
    <div>
      <h1>Users Statistics</h1>
      {loading ? (
        <p style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Loading users...</p>
      ) : (
        <div style={{width:"100%"}}>
          <table border="1" cellPadding="10" cellSpacing="0" style={{width:"100%"}}>
            <thead>
              <tr>
                <th>ID</th><th>Avatar</th><th>Name</th><th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={{textAlign:"center"}}>{user.id}</td>
                  <td style={{textAlign:"center"}}><img src={user.avatar} alt={user.first_name} width="40" /></td>
                  <td style={{textAlign:"center"}}>{user.first_name} {user.last_name}</td>
                  <td style={{textAlign:"center"}}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '10px',display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            <button onClick={prevPage} disabled={page === 1}>
              <span style={{display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>Previous</span>
            </button>
            <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
            <button onClick={nextPage} disabled={page === totalPages}>
              <span style={{display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>Next</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
