import { useState } from 'react';
import { LayoutDashboard, Users } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { PlayerList } from './components/PlayerList';
import { PlayerDetail } from './components/PlayerDetail';
import { PlayerForm } from './components/PlayerForm';
import type { Player } from './types/Player';

type View = 'dashboard' | 'players';

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">X</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">XITA LDN</h1>
                  <p className="text-xs text-gray-500">Football Manager</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    currentView === 'dashboard'
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('players')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    currentView === 'players'
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Players
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'players' && (
          <PlayerList
            onEditPlayer={handleEditPlayer}
            onViewPlayer={handleViewPlayer}
            onAddPlayer={handleAddPlayer}
            refresh={refreshKey}
          />
        )}
      </main>

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
