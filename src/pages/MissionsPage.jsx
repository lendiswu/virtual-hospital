import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { Play, Clock, Target } from 'lucide-react';
import './LearnerDashboard.css'; // Reuse styles

const MissionsPage = () => {
  const { t, lang } = useI18n();
  const navigate = useNavigate();

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
      <section className="activities-section" style={{ marginTop: '20px' }}>
        <h2 className="section-title text-gradient">{t('clinicalMissions')}</h2>
        
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

export default MissionsPage;
