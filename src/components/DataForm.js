import { useState } from 'react';
import axios from 'axios';

function DataForm() {
  const [formData, setFormData] = useState({ name: '', job: '' });
  const [response, setResponse] = useState(null);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://reqres.in/api/users', formData,{
        headers: {
        'x-api-key': 'reqres-free-v1'
      }
    })
      .then(res => {
        setResponse(res.data);
        alert("User created with ID: " + res.data.id);
      })
      .catch(err => {
        alert("Error creating user");
        console.error(err);
      });
  };

  return (
    <div style={{backgroundColor:"var(--style)",width:"400px",height:"200px",display:"flex",borderRadius:"10px",padding:"30px",flexDirection:"column"}}>
      <form onSubmit={handleSubmit} style={{width:"100%",display:"flex",flexDirection:"column"}}>
        <input style={{height:"30px",borderRadius:"10px",fontSize:"larger"}} name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br />
        <input style={{height:"30px",borderRadius:"10px",fontSize:"larger"}} name="job" placeholder="Job" value={formData.job} onChange={handleChange} required /><br />
        <button type="submit">
          <span style={{display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>Submit </span></button>
      </form>
      {response && (
        <p style={{fontWeight:"bold",textAlign:"left"}}>
          User created! ID: {response.id},<br/>
           Created At: {response.createdAt}
        </p>
      )}
    </div>
  );
}

export default DataForm;
