import { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function countByKey(array, keyPath) {
  const counts = {};
  array.forEach(item => {
    const value = keyPath.split('.').reduce((obj, key) => obj?.[key], item);
    if (value) counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
}

const chartOptions = title => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: true, text: title }
  }
});

function UserCharts({ users }) {
  const [activeChart, setActiveChart] = useState('role');

  const roleData = useMemo(() => {
    const counts = countByKey(users, 'role');
    return {
      data: {
        labels: Object.keys(counts),
        datasets: [{
          label: 'Users by Role',
          data: Object.values(counts),
          backgroundColor: '#3B82F6',
          borderRadius: 6
        }]
      },
      options: chartOptions('Users by Role')
    };
  }, [users]);

  const genderData = useMemo(() => {
    const counts = countByKey(users, 'gender');
    return {
      data: {
        labels: Object.keys(counts),
        datasets: [{
          label: 'Users by Gender',
          data: Object.values(counts),
          backgroundColor: '#10B981',
          borderRadius: 6
        }]
      },
      options: chartOptions('Users by Gender')
    };
  }, [users]);

  const deptData = useMemo(() => {
    const counts = countByKey(users, 'company.department');
    return {
      data: {
        labels: Object.keys(counts),
        datasets: [{
          label: 'Users by Department',
          data: Object.values(counts),
          backgroundColor: '#F59E0B',
          borderRadius: 6
        }]
      },
      options: chartOptions('Users by Department')
    };
  }, [users]);

  const eyeColorData = useMemo(() => {
    const counts = countByKey(users, 'eyeColor');
    return {
      data: {
        labels: Object.keys(counts),
        datasets: [{
          label: 'Users by Eye Color',
          data: Object.values(counts),
          backgroundColor: '#8B5CF6',
          borderRadius: 6
        }]
      },
      options: chartOptions('Users by Eye Color')
    };
  }, [users]);

  const renderChart = () => {
    if (activeChart === 'role') return <Bar data={roleData.data} options={roleData.options} />;
    if (activeChart === 'gender') return <Bar data={genderData.data} options={genderData.options} />;
    if (activeChart === 'department') return <Bar data={deptData.data} options={deptData.options} />;
    if (activeChart === 'eyeColor') return <Bar data={eyeColorData.data} options={eyeColorData.options} />;
    return null;
  };

  return (
    <div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', border: "1px solid var(--border)", borderRadius:"8px", width: "fit-content", padding: 10 }}>
        <button onClick={() => setActiveChart('role')}>
          <span style={{display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>By Role</span>
        </button>
        <button onClick={() => setActiveChart('gender')}>
          <span style={{display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>By Gender</span>
        </button>
        <button onClick={() => setActiveChart('department')}>
          <span style={{display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>By Department</span>
        </button>
        <button onClick={() => setActiveChart('eyeColor')}>
          <span style={{display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>By Eye Color</span>
        </button>
      </div>

      <div style={{ height: '350px' }}>
        {renderChart()}
      </div>
    </div>
  );
}

export default UserCharts;
