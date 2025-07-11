import { Link } from 'react-router-dom';
import dashboardui from '../assets/dashboardui.png'

function Sidebar() {
  return (
    <div style={{
      width: '300px',
      background: 'var(--white)',
      color: 'var(--dark)',
      height: '100vh',
    
      borderRight:'1px solid'
    }}>
      <span style={{display:"flex", padding: 20,borderBottom:"1px solid"}}>
      <span>
        <img src={dashboardui} alt='logo' width={23} height={23}/>
      </span>
      <h2 >Dashboard-UI</h2>
      </span>
      <nav style={{borderBottom:"1px solid"}}>
        <ul style={{ listStyle: 'none', padding: 20,display:"flex", flexDirection:"column",justifyContent:"center",gap:"15px" }}>
          <li><Link to="/" style={{ color: 'var(--dark)', textDecoration: 'none',fontWeight:"bold" }}>Dashboard</Link></li>
          <li><Link to="/users" style={{ color: 'var(--dark)', textDecoration: 'none',fontWeight:"bold" }}>Users List</Link></li>
          <li><Link to="/createuser" style={{ color: 'var(--dark)', textDecoration: 'none',fontWeight:"bold" }}>Create user</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
