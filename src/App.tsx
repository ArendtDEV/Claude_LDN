import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PlayerList } from './components/PlayerList';
import { PlayerDetail } from './components/PlayerDetail';
import { PlayerForm } from './components/PlayerForm';
import type { Player } from './types/Player';

type View = 'dashboard' | 'players' | 'analytics' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleViewPlayer = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player);
    setShowPlayerForm(true);
  };

  const handleAddPlayer = () => {
    setEditingPlayer(null);
    setShowPlayerForm(true);
  };

  const handleCloseForm = () => {
    setShowPlayerForm(false);
    setEditingPlayer(null);
  };

  const handleSavePlayer = () => {
    setShowPlayerForm(false);
    setEditingPlayer(null);
    setRefreshKey(prev => prev + 1);
  };

  const getPageTitle = () => {
    const titles: Record<View, string> = {
      dashboard: 'Dashboard',
      players: 'Players Database',
      analytics: 'Analytics',
      settings: 'Settings',
    };
    return titles[currentView];
  };

  const getPageIcon = () => {
    const icons: Record<View, string> = {
      dashboard: '🏠',
      players: '⚽',
      analytics: '📊',
      settings: '⚙️',
    };
    return icons[currentView];
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <Sidebar currentView={currentView} onNavigate={(view) => setCurrentView(view as View)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Page Header - Notion Style */}
        <div className="px-16 pt-16 pb-8">
          <div className="max-w-5xl">
            <div className="text-6xl mb-4">{getPageIcon()}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{getPageTitle()}</h1>
            <p className="text-gray-500 text-sm">
              {currentView === 'dashboard' && 'Overview of your football club statistics'}
              {currentView === 'players' && 'Manage your squad and player information'}
              {currentView === 'analytics' && 'Detailed analytics and insights'}
              {currentView === 'settings' && 'Configure your preferences'}
            </p>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 px-16 pb-16">
          <div className="max-w-5xl">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'players' && (
              <PlayerList
                onEditPlayer={handleEditPlayer}
                onViewPlayer={handleViewPlayer}
                onAddPlayer={handleAddPlayer}
                refresh={refreshKey}
              />
            )}
            {currentView === 'analytics' && (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">Analytics view coming soon...</p>
              </div>
            )}
            {currentView === 'settings' && (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">Settings view coming soon...</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      {selectedPlayer && (
        <PlayerDetail player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
      {showPlayerForm && (
        <PlayerForm
          player={editingPlayer || undefined}
          onClose={handleCloseForm}
          onSave={handleSavePlayer}
        />
      )}
    </div>
  );
}

export default App;
