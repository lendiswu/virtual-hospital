import React from 'react';
import { useI18n } from '../../i18n';
import { Bell, Globe, UserCircle2, ShieldAlert, Menu } from 'lucide-react';
import './Header.css';

const Header = ({ toggleMenu }) => {
  const { lang, toggleLang, role, toggleRole, t } = useI18n();

  return (
    <header className="header glass-panel">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
      </div>

      <div className="header-right">
        <div className="role-switch">
          <button className="btn-secondary flex-gap" onClick={toggleRole}>
            {role === 'learner' ? <UserCircle2 size={16} /> : <ShieldAlert size={16} />}
            {role === 'learner' ? t('learnerView') : t('facultyView')}
          </button>
        </div>

        <button className="lang-toggle flex-gap" onClick={toggleLang} title="Switch Language">
          <Globe size={18} />
          <span>{lang === 'en' ? 'EN' : '繁體中文'}</span>
        </button>

        <div className="notification-icon">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </div>

        <div className="user-profile">
          <div className="avatar">
            <img 
              src={role === 'learner' ? "https://i.pravatar.cc/150?u=learner" : "https://i.pravatar.cc/150?u=faculty"} 
              alt="Profile" 
            />
          </div>
          <div className="user-info">
            <div className="user-name">{role === 'learner' ? 'Dr. Sarah Chen' : 'Prof. Alan Lin'}</div>
            <div className="user-role">{role === 'learner' ? 'PGY-1 Resident' : 'Attending Physician'}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
