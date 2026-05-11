import React from 'react';
import { useI18n } from '../i18n';
import { 
  HeartPulse,
  BookOpen,
  Globe,
  GraduationCap,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import './LearnerDashboard.css';

const GaugeChart = ({ value, color }) => {
  const radius = 60;
  const circumference = radius * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  return (
    <div className="gauge-container">
      <svg viewBox="0 0 160 100" className="gauge-svg">
        <path d="M 20 80 A 60 60 0 0 1 140 80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeLinecap="round" />
        <path d="M 20 80 A 60 60 0 0 1 140 80" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" 
              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
              style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
      </svg>
      <div className="gauge-value" style={{ color }}>{value}%</div>
    </div>
  );
};

const PortfolioPage = () => {
  const { t, lang } = useI18n();

  const competencyData = [
    { subject: t('patientCare'), A: 80, fullMark: 100 },
    { subject: t('medicalKnowledge'), A: 90, fullMark: 100 },
    { subject: t('interpersonalSkills'), A: 65, fullMark: 100 },
    { subject: t('professionalism'), A: 85, fullMark: 100 },
    { subject: t('practiceBasedLearning'), A: 70, fullMark: 100 },
    { subject: t('systemsBasedPractice'), A: 60, fullMark: 100 },
  ];

  const detailedCompetencies = [
    { 
      id: 'pc', 
      title: 'Patient Care (PC)', 
      value: 84, 
      color: '#06B6D4', 
      icon: <HeartPulse size={16} />,
      subtitle: 'Compassionate, Appropriate, Effective Care',
      metrics: [{ label: 'Clinical Skills', val: 86 }, { label: 'Decision Making', val: 82 }]
    },
    { 
      id: 'mk', 
      title: 'Medical Knowledge (MK)', 
      value: 79, 
      color: '#F59E0B', 
      icon: <BookOpen size={16} />,
      subtitle: 'Evidenced-Based Practice & Application',
      metrics: [{ label: 'Cognitive Knowledge', val: 80 }, { label: 'Assessment Performance', val: 78 }]
    },
    { 
      id: 'sbp', 
      title: 'Systems-Based Practice (SBP)', 
      value: 82, 
      color: '#8B5CF6', 
      icon: <Globe size={16} />,
      subtitle: 'Navigating Healthcare Systems, Quality Improvement',
      metrics: [{ label: 'Interprofessional Collaboration', val: 84 }, { label: 'Patient Safety', val: 80 }]
    },
    { 
      id: 'pbli', 
      title: 'Practice-Based Learning (PBLI)', 
      value: 77, 
      color: '#10B981', 
      icon: <GraduationCap size={16} />,
      subtitle: 'Self-Evaluation, Quality Improvement (QI)',
      metrics: [{ label: 'Feedback Use', val: 75 }, { label: 'Journal Club', val: 79 }]
    },
    { 
      id: 'ics', 
      title: 'Interpersonal & Communication (ICS)', 
      value: 88, 
      color: '#EF4444', 
      icon: <MessageCircle size={16} />,
      subtitle: 'Effective Exchange, Professional Relationships',
      metrics: [{ label: 'Patient Communication', val: 90 }, { label: 'Team Communication', val: 86 }]
    },
    { 
      id: 'prof', 
      title: 'Professionalism (PROF)', 
      value: 91, 
      color: '#EAB308', 
      icon: <ShieldCheck size={16} />,
      subtitle: 'Adherence to Ethical Principles, Responsibilities',
      metrics: [{ label: 'Ethical Behavior', val: 92 }, { label: 'Accountability', val: 90 }]
    },
  ];

  const competencyTrendData = [
    { month: 'Jan', PC: 55, MK: 60, ICS: 50, PROF: 65, SBP: 55, PBLI: 60 },
    { month: 'Feb', PC: 60, MK: 65, ICS: 60, PROF: 70, SBP: 60, PBLI: 65 },
    { month: 'Mar', PC: 65, MK: 72, ICS: 70, PROF: 78, SBP: 68, PBLI: 70 },
    { month: 'Apr', PC: 75, MK: 75, ICS: 80, PROF: 85, SBP: 75, PBLI: 72 },
    { month: 'May', PC: 84, MK: 79, ICS: 88, PROF: 91, SBP: 82, PBLI: 77 },
  ];

  return (
    <div className="dashboard-container">
      <section className="competency-section" style={{ marginTop: '20px' }}>
        <h2 className="section-title text-gradient">{t('acgmeCompetencies')}</h2>
        
        <div className="competency-dashboard-layout">
          <div className="radar-chart-container glass-panel">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={competencyData}>
                <PolarGrid stroke="var(--border-glass)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Competency" dataKey="A" stroke="var(--accent-cyan)" fill="var(--accent-cyan)" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="gauge-cards-grid">
            {detailedCompetencies.map(comp => (
              <div key={comp.id} className="gauge-card glass-panel" style={{ borderColor: `${comp.color}40` }}>
                <div className="gauge-header" style={{ color: comp.color }}>
                  {comp.icon}
                  <h3 className="gauge-title">{comp.title}</h3>
                </div>
                
                <GaugeChart value={comp.value} color={comp.color} />
                
                <div className="gauge-subtitle">{comp.subtitle}</div>
                
                <div className="gauge-metrics">
                  {comp.metrics.map((m, i) => (
                    <div key={i} className="metric-row">
                      <div className="metric-label">{m.label}</div>
                      <div className="metric-val" style={{ color: comp.color }}>{m.val}</div>
                      <div className="metric-bar-bg">
                        <div className="metric-bar-fill" style={{ width: `${m.val}%`, background: comp.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="gauge-legend">
                  <span className="legend-item"><span className="legend-dot" style={{borderColor: 'var(--accent-cyan)'}}></span> Target</span>
                  <span className="legend-item"><span className="legend-dot" style={{borderColor: '#F59E0B'}}></span> Average</span>
                  <span className="legend-item"><span className="legend-dot" style={{background: comp.color}}></span> Resident</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trend-section">
        <h2 className="section-title text-gradient">
          {lang === 'en' ? 'Competency Growth Trend' : '能力成長趨勢'}
        </h2>
        <div className="glass-panel" style={{ height: '350px', padding: '24px', marginBottom: '40px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={competencyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" domain={[0, 100]} />
              <Tooltip contentStyle={{backgroundColor: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', color: 'white'}} />
              <Line type="monotone" dataKey="PC" stroke="#06B6D4" strokeWidth={2} name="PC" />
              <Line type="monotone" dataKey="MK" stroke="#F59E0B" strokeWidth={2} name="MK" />
              <Line type="monotone" dataKey="ICS" stroke="#EF4444" strokeWidth={2} name="ICS" />
              <Line type="monotone" dataKey="PROF" stroke="#EAB308" strokeWidth={2} name="PROF" />
              <Line type="monotone" dataKey="SBP" stroke="#8B5CF6" strokeWidth={2} name="SBP" />
              <Line type="monotone" dataKey="PBLI" stroke="#10B981" strokeWidth={2} name="PBLI" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
