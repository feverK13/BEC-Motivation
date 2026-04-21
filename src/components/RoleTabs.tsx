import { useState } from 'react';
import './RoleTabs.css';
export function RoleTabs({ logistician, itSpecialist }: { logistician: { why: string; bring: string; get: string }; itSpecialist: { why: string; bring: string; get: string } }) {
  const [activeRole, setActiveRole] = useState<'logistician' | 'it'>('logistician');
  const currentContent = activeRole === 'logistician' ? logistician : itSpecialist;
  return (
    <div className="role-tabs">
      <div className="role-tabs-header">
        <button className={`role-tab ${activeRole === 'logistician' ? 'active' : ''}`} onClick={() => setActiveRole('logistician')}>Логіст</button>
        <button className={`role-tab ${activeRole === 'it' ? 'active' : ''}`} onClick={() => setActiveRole('it')}>ІТшник</button>
      </div>
      <div className="role-content">
        <div className="role-block"><h3>🎯 Чому ця роль?</h3><p>{currentContent.why}</p></div>
        <div className="role-block"><h3>💪 Що я принесу?</h3><p>{currentContent.bring}</p></div>
        <div className="role-block"><h3>🌟 Що я отримаю?</h3><p>{currentContent.get}</p></div>
      </div>
    </div>
  );
}
