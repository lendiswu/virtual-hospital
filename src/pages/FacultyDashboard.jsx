import React from 'react';
import { useI18n } from '../i18n';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  BrainCircuit, 
  Activity, 
  BarChart2, 
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import './FacultyDashboard.css';

const FacultyDashboard = () => {
  const { t, lang } = useI18n();

  const competencyTrendData = [
    { name: 'Week 1', PC: 40, MK: 60, ICS: 45 },
    { name: 'Week 2', PC: 55, MK: 65, ICS: 50 },
    { name: 'Week 3', PC: 70, MK: 75, ICS: 65 },
    { name: 'Week 4', PC: 85, MK: 85, ICS: 80 },
  ];

  const engagementData = [
    { mission: 'ED Challenge', completion: 85 },
    { mission: 'ICU Crisis', completion: 40 },
    { mission: 'Communication', completion: 95 },
    { mission: 'Trauma Team', completion: 60 },
  ];

  const riskStudents = [
    { id: 1, name: 'Dr. John Doe', issue: 'Low Interpersonal Skills Score', risk: 'High' },
    { id: 2, name: 'Dr. Jane Smith', issue: 'Delayed Progression in ICU Module', risk: 'Medium' },
    { id: 3, name: 'Dr. Alice Wang', issue: 'Poor Communication in Crisis', risk: 'Medium' },
  ];

  return (
    <div className="faculty-dashboard">
      <div className="faculty-header">
        <h1 className="hero-title text-gradient">{t('facultyDashboard')}</h1>
        <p className="hero-subtitle">Academic Command Center & AI Analytics</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)'}}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">124</div>
            <div className="stat-label">Active Learners</div>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{color: 'var(--accent-teal)', background: 'rgba(20, 184, 166, 0.1)'}}>
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">845</div>
            <div className="stat-label">Completed Missions</div>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{color: '#F59E0B', background: 'rgba(245, 158, 11, 0.1)'}}>
            <BrainCircuit size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">3,210</div>
            <div className="stat-label">AI Feedback Generated</div>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{color: '#EF4444', background: 'rgba(239, 68, 68, 0.1)'}}>
            <AlertTriangle size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value text-danger">3</div>
            <div className="stat-label">At-Risk Learners</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Cohort Competency Overview */}
        <div className="chart-panel glass-panel">
          <h3 className="panel-title flex-gap"><Target size={18} /> {t('cohortCompetency')}</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={competencyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{backgroundColor: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', color: 'white'}} />
                <Line type="monotone" dataKey="PC" stroke="var(--accent-cyan)" strokeWidth={3} name={t('patientCare')} />
                <Line type="monotone" dataKey="MK" stroke="var(--accent-teal)" strokeWidth={3} name={t('medicalKnowledge')} />
                <Line type="monotone" dataKey="ICS" stroke="#F59E0B" strokeWidth={3} name={t('interpersonalSkills')} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mission Completion Rates */}
        <div className="chart-panel glass-panel">
          <h3 className="panel-title flex-gap"><BarChart2 size={18} /> {t('activeMissions')} (Completion %)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" />
                <XAxis type="number" stroke="var(--text-secondary)" domain={[0, 100]} />
                <YAxis dataKey="mission" type="category" stroke="var(--text-secondary)" width={100} />
                <Tooltip contentStyle={{backgroundColor: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px'}} />
                <Bar dataKey="completion" fill="var(--accent-teal)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Learner Risk Detection */}
        <div className="risk-panel glass-panel" style={{gridColumn: '1 / -1'}}>
          <h3 className="panel-title flex-gap text-danger"><AlertTriangle size={18} /> {t('learnerRiskDetection')}</h3>
          <div className="risk-table-container">
            <table className="risk-table">
              <thead>
                <tr>
                  <th>Learner</th>
                  <th>Identified Risk Area</th>
                  <th>Risk Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riskStudents.map(student => (
                  <tr key={student.id}>
                    <td className="font-medium">{student.name}</td>
                    <td>{student.issue}</td>
                    <td>
                      <span className={`badge risk-${student.risk.toLowerCase()}`}>{student.risk}</span>
                    </td>
                    <td>
                      <button className="btn-secondary btn-sm">Review Portfolio</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
