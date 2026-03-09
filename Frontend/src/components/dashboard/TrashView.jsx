import React, { useState } from 'react';
import { 
  Trash2, Search, X, List, FileText, 
  Star, AlertTriangle, RotateCcw, Monitor, CreditCard 
} from 'lucide-react';
import './TrashView.css';

// Asset Imports
import Trash1 from "../../assets/Trash-Images/Trash1.png";
import Trashp2 from "../../assets/Trash-Images/Trash2.png";
import Trash3 from "../../assets/Trash-Images/Trash3.png";
import Trash4 from "../../assets/Trash-Images/Trash4.png";
import Trash5 from "../../assets/Trash-Images/Trash5.png";
import EmptyTrashImg from "../../assets/Trash-Images/EmptyTrash.png"; 

const TrashView = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trashItems, setTrashItems] = useState([
    { id: 1, title: 'Real Estate design', type: 'image', date: 'Deleted 1 days ago', info: '1080x1080px • 984 KB', img: Trash1 },
    { id: 2, title: 'PPT Web developer', type: 'presentation', date: 'Deleted 1 days ago', info: '1080x1080px • 984 KB', img: Trashp2 },
    { id: 3, title: 'Harper Business Card', type: 'card', date: 'Deleted 1 days ago', info: '1080x1080px • 984 KB', img: Trash3 },
    { id: 4, title: 'Larana Post', type: 'image', date: 'Deleted 1 days ago', info: '1080x1080px • 984 KB', img: Trash4 },
    { id: 5, title: 'Hiring Post', type: 'image', date: 'Deleted 1 days ago', info: '1080x1080px • 984 KB', img: Trash5 },
  ]);

  const handleRestoreItem = (id) => {
    setTrashItems(prev => prev.filter(item => item.id !== id));
  };

  const handleDeleteItem = (id) => {
    setTrashItems(prev => prev.filter(item => item.id !== id));
  };

  const confirmEmptyTrash = () => {
    setTrashItems([]);
    setShowDeleteModal(false);
  };

  const renderTrashIcon = (type) => {
    switch (type) {
      case 'presentation':
        return <div className="rd-trash-card__type-icon rd-trash-card__type-icon--purple"><Monitor size={16} /></div>;
      case 'card':
        return <div className="rd-trash-card__type-icon rd-trash-card__type-icon--blue"><CreditCard size={16} /></div>;
      default:
        return <div className="rd-trash-card__type-icon rd-trash-card__type-icon--green"><FileText size={16} /></div>;
    }
  };

  return (
    <div className=" dashboard-wrapper rd-trash-module-root">
      {/* --- CONFIRMATION MODAL --- */}
      {showDeleteModal && (
        <div className="rd-trash-modal-overlay">
          <div className="rd-trash-modal-box">
            <div className="rd-trash-modal-box__warning-icon">
              <AlertTriangle size={32} />
            </div>
            <h2 className="rd-trash-modal-box__title">Empty Trash?</h2>
            <p className="rd-trash-modal-box__desc">
              Are you sure you want to permanently delete these items? This action <strong>cannot be undone</strong>.
            </p>
            <div className="rd-trash-modal-box__actions">
              <button className="rd-trash-btn rd-trash-btn--secondary" onClick={() => setShowDeleteModal(false)}>
                No, Keep them
              </button>
              <button className="rd-trash-btn rd-trash-btn--danger" onClick={confirmEmptyTrash}>
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="rd-trash-header">
        <h1 className=" dashboard-title">
          Recover or Delete <span >Permanently</span>
        </h1>
        
        <div className={`rd-trash-search ${isSearchActive ? 'rd-trash-search--expanded' : ''}`}>
          <div className="rd-trash-search__container">
            <span className="rd-trash-search__scope-badge">In:Trash</span>
            <input 
              className="rd-trash-search__input-field"
              type="text" 
              placeholder="Search Trash" 
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
            />
            <Search className="rd-trash-search__icon-main" size={20} />
            {isSearchActive && (
              <X className="rd-trash-search__icon-clear" size={18} onClick={() => setIsSearchActive(false)} />
            )}
          </div>
        </div>
      </header>
      <div className="rd-trash-tile"><h3 className="workspace-title">Trash</h3></div>

      <div className="rd-trash-controls-bar">
        
        <div className="rd-trash-controls-bar__left">
          <button className="rd-trash-tab-link rd-trash-tab-link--active">Projects</button>
          <button className="rd-trash-tab-link">Folders</button>
        </div>
        <div className="rd-trash-controls-bar__right">
          <button 
            className={`rd-trash-btn-empty-all ${trashItems.length === 0 ? 'rd-trash-btn-empty-all--muted' : ''}`} 
            onClick={() => trashItems.length > 0 && setShowDeleteModal(true)}
          >
            Empty Trash
          </button>
          <List className="rd-trash-view-toggle-icon" size={20} />
        </div>
      </div>

      {trashItems.length > 0 ? (
        <div className="rd-trash-items-grid">
          {trashItems.map((item) => (
            <div key={item.id} className="rd-trash-card">
              <div className="rd-trash-card__preview-area">
                <img className="rd-trash-card__thumbnail" src={item.img} alt={item.title} />
                
                <button className="rd-trash-card__favorite-btn">
                  <Star size={16} color="#cbd5e1" />
                </button>

                <div className="rd-trash-card__hover-mask">
                  <button className="rd-trash-action-btn rd-trash-action-btn--restore" onClick={() => handleRestoreItem(item.id)}>
                    <RotateCcw size={14} /> Restore
                  </button>
                  <button className="rd-trash-action-btn rd-trash-action-btn--delete" onClick={() => handleDeleteItem(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="rd-trash-card__info-area">
                {renderTrashIcon(item.type)}
                <div className="rd-trash-card__text-group">
                  <h3 className="rd-trash-card__item-name">{item.title}</h3>
                  <p className="rd-trash-card__item-timestamp">{item.date}</p>
                  <p className="rd-trash-card__item-metadata">{item.info}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rd-trash-empty-state">
          <img className="rd-trash-empty-state__img" src={EmptyTrashImg} alt="Empty Trash" />
          <h2 className="rd-trash-empty-state__title">Trash is empty</h2>
          <p className="rd-trash-empty-state__subtitle">Files you delete will appear here</p>
        </div>
      )}
    </div>
  );
};

export default TrashView;