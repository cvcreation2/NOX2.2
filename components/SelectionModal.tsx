import React, { useState, useMemo } from 'react';
import { Search, X, ChevronRight, Heart, Filter } from 'lucide-react';

export interface SelectionItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  tags?: string[];
  rightElement?: React.ReactNode;
}

interface SelectionModalProps {
  title: string;
  items: SelectionItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
  // New props for favorites and filtering
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  filterOptions?: string[];
}

const SelectionModal: React.FC<SelectionModalProps> = ({ 
  title, 
  items, 
  selectedId, 
  onSelect, 
  onClose,
  favorites = [],
  onToggleFavorite,
  filterOptions = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = activeFilter === 'All' || item.tags?.includes(activeFilter);
      
      return matchesSearch && matchesFilter;
    });
  }, [items, searchQuery, activeFilter]);

  const favoriteItems = useMemo(() => {
    return filteredItems.filter(item => favorites.includes(item.id));
  }, [filteredItems, favorites]);

  const nonFavoriteItems = useMemo(() => {
    return filteredItems.filter(item => !favorites.includes(item.id));
  }, [filteredItems, favorites]);

  const renderItem = (item: SelectionItem) => {
    const isFav = favorites.includes(item.id);
    return (
      <div
        key={item.id}
        className={`relative w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 transition-all duration-200 group active:scale-[0.98] ${
          selectedId === item.id ? 'ring-2 ring-[#7c3aed] border-transparent' : 'hover:border-purple-300 dark:hover:border-purple-700'
        }`}
      >
        <button
          onClick={() => {
            onSelect(item.id);
            onClose();
          }}
          className="flex-1 flex items-center gap-4 p-4 text-left min-w-0"
        >
          {/* Icon */}
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl flex-shrink-0 shadow-inner">
            {item.icon}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{item.title}</div>
            {item.subtitle && (
               <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide truncate">{item.subtitle}</div>
            )}
          </div>

          {/* Tags / Right Element */}
          <div className="flex flex-col items-end gap-1">
             {item.rightElement}
             {item.tags && (
               <div className="flex gap-1 flex-wrap justify-end">
                 {item.tags.slice(0, 1).map(tag => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 bg-[#7c3aed]/10 text-[#7c3aed] dark:text-purple-300 rounded-full font-bold border border-purple-500/20 shadow-sm whitespace-nowrap">
                        {tag}
                    </span>
                 ))}
               </div>
             )}
          </div>
        </button>

        {/* Favorite Toggle Button */}
        {onToggleFavorite && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item.id);
            }}
            className={`p-4 transition-colors group/fav ${isFav ? 'text-rose-500' : 'text-slate-300 dark:text-slate-600 hover:text-rose-400'}`}
          >
            <Heart size={20} fill={isFav ? "currentColor" : "none"} className="transition-transform group-active/fav:scale-125" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-sm h-[85vh] flex flex-col bg-[#f1f5f9] dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
        
        {/* Header */}
        <div className="bg-[#7c3aed] p-6 pb-6 rounded-b-[2.5rem] shadow-lg z-10 flex-shrink-0 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>

          <h2 className="text-xl font-bold text-white text-center mb-4 relative z-10 tracking-tight">{title}</h2>
          
          <div className="relative z-10 space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={18} />
              </div>
              <input 
                type="text"
                placeholder="Search server or protocol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-900 pl-12 pr-4 py-3 rounded-full text-sm font-medium shadow-inner outline-none focus:ring-2 focus:ring-purple-300 transition-all placeholder:text-slate-400"
                autoFocus
              />
            </div>

            {/* Protocol Filters */}
            {filterOptions.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-2 px-2">
                {['All', ...filterOptions].map(option => (
                  <button
                    key={option}
                    onClick={() => setActiveFilter(option)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                      activeFilter === option 
                        ? 'bg-white text-purple-700 border-white shadow-lg' 
                        : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar -mt-4 pt-8 z-0">
          
          {/* Favorites Section */}
          {favoriteItems.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <Heart size={12} className="text-rose-500 fill-rose-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Favorites</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
              </div>
              {favoriteItems.map(renderItem)}
            </div>
          )}

          {/* Regular Items Section */}
          <div className="space-y-3">
            {favoriteItems.length > 0 && nonFavoriteItems.length > 0 && (
              <div className="flex items-center gap-2 px-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">All Available</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
              </div>
            )}
            {nonFavoriteItems.map(renderItem)}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-20 flex flex-col items-center gap-4 text-slate-400">
               <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
                <Filter size={32} strokeWidth={1.5} />
               </div>
               <div>
                <p className="font-bold">No results found</p>
                <p className="text-xs">Try adjusting your filters or search terms</p>
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
           <button 
             onClick={onClose}
             className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-purple-500/30 transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
           >
             Dismiss
           </button>
        </div>

      </div>
    </div>
  );
};

export default SelectionModal;