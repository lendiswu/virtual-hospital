import React from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { 
  LayoutDashboard, 
  Stethoscope, 
  Users, 
  Activity, 
  FileText, 
  Pill, 
  MessageSquare, 
  FolderOpen, 
  BrainCircuit, 
  Settings,
  Hammer,
  BarChart3,
  Target,
  Video,
  GraduationCap,
  Microscope,
  BookOpen,
  X
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { t, role } = useI18n();

  const learnerLinks = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "dashboard" },
    { to: "/missions", icon: <Stethoscope size={20} />, label: "clinicalMissions" },
    { to: "/portfolio", icon: <FolderOpen size={20} />, label: "portfolio" },
    { to: "/advancing", icon: <BrainCircuit size={20} />, label: "advancingProject" },
  ];

  const facultyLinks = [
    { to: "/faculty", icon: <LayoutDashboard size={20} />, label: "facultyDashboard", end: true },
    { to: "/faculty/builder", icon: <Hammer size={20} />, label: "missionBuilder" },
    { to: "/faculty/analytics", icon: <BarChart3 size={20} />, label: "learnerAnalytics" },
    { to: "/faculty/competency", icon: <Target size={20} />, label: "competencyTracking" },
    { to: "/faculty/team-review", icon: <Video size={20} />, label: "teamSimulationReview" },
    { to: "/faculty/ai-assessment", icon: <BrainCircuit size={20} />, label: "aiAssessment" },
    { to: "/faculty/courses", icon: <BookOpen size={20} />, label: "courseManagement" },
    { to: "/faculty/portfolio-review", icon: <GraduationCap size={20} />, label: "portfolioReview" },
    { to: "/faculty/research", icon: <Microscope size={20} />, label: "researchAnalytics" },
  ];

  const links = role === 'learner' ? learnerLinks : facultyLinks;

  return (
    <aside className={`sidebar glass-panel ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon flex-center">
            <Activity size={28} className="text-accent-cyan" />
          </div>
          <h2 className="logo-text text-accent-gradient">Virtual Hospital</h2>
        </div>
        <button className="mobile-close-btn" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {links.map((link, idx) => (
          <NavLink 
            key={idx} 
            to={link.to} 
            end={link.end}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            <span className="nav-icon">{link.icon}</span>
            <span className="nav-label">{t(link.label)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="nav-icon"><Settings size={20} /></span>
          <span className="nav-label">{t('settings')}</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
