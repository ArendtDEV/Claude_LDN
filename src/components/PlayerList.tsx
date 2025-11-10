import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import type { Player, Position } from '../types/Player';
import { playerService } from '../services/playerService';

interface PlayerListProps {
  onEditPlayer: (player: Player) => void;
  onViewPlayer: (player: Player) => void;
  onAddPlayer: () => void;
  refresh?: number;
}

export function PlayerList({ onEditPlayer, onViewPlayer, onAddPlayer, refresh }: PlayerListProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('');

  const positions: Position[] = ['GK', 'LB', 'CB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'LM', 'RM', 'AM', 'LW', 'RW', 'ST', 'CF'];

  useEffect(() => {
    loadPlayers();
  }, [searchQuery, positionFilter, refresh]);

  const loadPlayers = () => {
    let result = playerService.getAllPlayers();

    if (positionFilter) {
      result = result.filter(p => p.position === positionFilter);
    }

    if (searchQuery) {
      result = playerService.searchPlayers(searchQuery);
      if (positionFilter) {
        result = result.filter(p => p.position === positionFilter);
      }
    }

    setPlayers(result);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      playerService.deletePlayer(id);
      loadPlayers();
    }
  };

  const getPositionColor = (position: Position) => {
    const colors: Record<string, string> = {
      GK: 'bg-yellow-100 text-yellow-800',
      LB: 'bg-blue-100 text-blue-800',
      CB: 'bg-blue-100 text-blue-800',
      RB: 'bg-blue-100 text-blue-800',
      LWB: 'bg-blue-100 text-blue-800',
      RWB: 'bg-blue-100 text-blue-800',
      DM: 'bg-green-100 text-green-800',
      CM: 'bg-green-100 text-green-800',
      LM: 'bg-green-100 text-green-800',
      RM: 'bg-green-100 text-green-800',
      AM: 'bg-purple-100 text-purple-800',
      LW: 'bg-red-100 text-red-800',
      RW: 'bg-red-100 text-red-800',
      ST: 'bg-red-100 text-red-800',
      CF: 'bg-red-100 text-red-800',
    };
    return colors[position] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Squad Players</h1>
        <button
          onClick={onAddPlayer}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Add Player
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Positions</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Player Cards */}
      <div className="grid grid-cols-1 gap-4">
        {players.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No players found
          </div>
        ) : (
          players.map((player) => (
            <div key={player.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex flex-col items-center">
                    {player.shirtNumber && (
                      <div className="text-3xl font-bold text-gray-900">{player.shirtNumber}</div>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPositionColor(player.position)}`}>
                      {player.position}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{player.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>{player.age} years</span>
                      <span>•</span>
                      <span>{player.nationality}</span>
                      <span>•</span>
                      <span>CA: {player.currentAbility || 'N/A'}</span>
                      <span>•</span>
                      <span>PA: {player.potential || 'N/A'}</span>
                      <span>•</span>
                      <span>£{player.value}M</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Ability:</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${((player.currentAbility || 0) / 200) * 100}%` }}
                        />
                      </div>
                    </div>
                    {player.morale && (
                      <span className="text-sm text-gray-600">Morale: {player.morale}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-6">
                  <button
                    onClick={() => onViewPlayer(player)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onEditPlayer(player)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(player.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="text-sm text-gray-600 text-center">
        Showing {players.length} player{players.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
