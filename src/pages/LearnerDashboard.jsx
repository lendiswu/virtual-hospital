import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Play, 
  Star, 
  BrainCircuit, 
  TrendingUp, 
  Clock, 
  Shield,
  Target,
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

const LearnerDashboard = () => {
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  // Mock Data for Mission Timeline
  const missionTimeline = [
    { id: 1, title: 'initialTriage', status: 'completed', score: '+15 XP' },
    { id: 2, title: 'medicalRecordReview', status: 'completed', score: '+10 XP' },
    { id: 3, title: 'virtualPatientInterview', status: 'active', aiFeedback: true },
    { id: 4, title: 'admissionAssessment', status: 'locked' },
    { id: 5, title: 'diagnosticOrderEntry', status: 'locked' },
    { id: 6, title: 'acuteDeterioration', status: 'locked' },
    { id: 7, title: 'patientCommunication', status: 'locked' },
    { id: 8, title: 'escalationToAttending', status: 'locked' },
  ];

  // Mock Data for ACGME Radar Chart
  const competencyData = [
    { subject: t('patientCare'), A: 80, fullMark: 100 },
    { subject: t('medicalKnowledge'), A: 90, fullMark: 100 },
    { subject: t('interpersonalSkills'), A: 65, fullMark: 100 },
    { subject: t('professionalism'), A: 85, fullMark: 100 },
    { subject: t('practiceBasedLearning'), A: 70, fullMark: 100 },
    { subject: t('systemsBasedPractice'), A: 60, fullMark: 100 },
  ];

  // New 6 Detailed Gauge Cards
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

  const clinicalMissions = [
    { 
      id: 1, 
      title: lang === 'en' ? 'Emergency Department Challenge' : '急診室挑戰', 
      time: '45 min', 
      difficulty: 'Hard', 
      focus: [
        { label: 'MK', color: '#F59E0B' }, 
        { label: 'PC', color: '#06B6D4' }, 
        { label: 'SBP', color: '#8B5CF6' }
      ],
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400'
    },
    { 
      id: 2, 
      title: lang === 'en' ? 'ICU Crisis Management' : '加護病房危機處理', 
      time: '60 min', 
      difficulty: 'Expert', 
      focus: [
        { label: 'PC', color: '#06B6D4' }, 
        { label: 'ICS', color: '#EF4444' }
      ],
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400'
    },
    { 
      id: 3, 
      title: lang === 'en' ? 'Communication with Difficult Patients' : '困難醫病溝通', 
      time: '30 min', 
      difficulty: 'Medium', 
      focus: [
        { label: 'ICS', color: '#EF4444' }, 
        { label: 'PROF', color: '#EAB308' },
        { label: 'PBLI', color: '#10B981' }
      ],
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <section className="hero-section glass-panel">
        <div className="hero-content">
          <div className="hero-header">
            <span className="badge">{t('currentClinicalMission')}</span>
            <h1 className="hero-title text-gradient">
              {lang === 'en' ? '40-year-old male with epigastric pain' : '40歲男性上腹痛'}
            </h1>
            <p className="hero-subtitle">
              {lang === 'en' ? 'Chief Complaint: Severe abdominal pain and nausea' : '主訴：劇烈腹痛伴隨噁心'}
            </p>
          </div>
          
          <div className="timeline-container">
            {missionTimeline.map((step, index) => (
              <div key={step.id} className={`timeline-step ${step.status}`}>
                <div className="step-icon">
                  {step.status === 'completed' && <CheckCircle2 size={24} />}
                  {step.status === 'active' && <Play size={24} className="pulse-animation" />}
                  {step.status === 'locked' && <Lock size={20} />}
                </div>
                <div className="step-content">
                  <div className="step-title">{t(step.title)}</div>
                  {step.status === 'completed' && <div className="step-score">{step.score}</div>}
                  {step.aiFeedback && (
                    <div className="step-feedback text-accent-gradient flex-gap" style={{gap: '4px'}}>
                      <BrainCircuit size={14} /> AI Analysis Ready
                    </div>
                  )}
                </div>
                {index < missionTimeline.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <button className="btn-primary flex-gap" onClick={() => navigate('/missions/1')}>
              <Play size={18} /> {t('startMission')}
            </button>
          </div>
        </div>
      </section>

      {/* ACGME Competency Dashboard */}
      <section className="competency-section">
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

      {/* Competency Growth Trend */}
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

      {/* Learning Activities */}
      <section className="activities-section">
        <h2 className="section-title text-gradient">{t('learningActivities')}</h2>
        
        <div className="missions-grid grid-3">
          {clinicalMissions.map(mission => (
            <div key={mission.id} className="mission-card glass-panel" onClick={() => navigate(`/missions/${mission.id}`)} style={{cursor: 'pointer'}}>
              <div className="mission-image">
                <img src={mission.image} alt={mission.title} />
                <div className="mission-overlay">
                  <button className="btn-play-overlay"><Play size={32} /></button>
                </div>
              </div>
              <div className="mission-info">
                <div className="mission-tags">
                  <span className="badge"><Clock size={12} className="mr-1" /> {mission.time}</span>
                  <span className="badge difficulty">{mission.difficulty}</span>
                </div>
                <h3 className="mission-title">{mission.title}</h3>
                <div className="mission-focus flex-gap" style={{ flexWrap: 'wrap' }}>
                  {mission.focus.map((f, i) => (
                    <span key={i} className="badge" style={{ borderColor: `${f.color}40`, color: f.color, background: `${f.color}10` }}>
                      {f.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearnerDashboard;
