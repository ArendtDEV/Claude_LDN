import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Table, LayoutGrid, List } from 'lucide-react';
import type { Player, Position } from '../types/Player';
import { playerService } from '../services/playerService';

interface PlayerListProps {
  onEditPlayer: (player: Player) => void;
  onViewPlayer: (player: Player) => void;
  onAddPlayer: () => void;
  refresh?: number;
}

type ViewMode = 'table' | 'gallery' | 'list';

export function PlayerList({ onEditPlayer, onViewPlayer, onAddPlayer, refresh }: PlayerListProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('table');

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
    <div className="space-y-4">
      {/* Toolbar - Notion Style */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Position Filter */}
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Positions</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center border border-gray-200 rounded-md">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 ${viewMode === 'table' ? 'bg-gray-100' : 'hover:bg-gray-50'} rounded-l-md transition`}
              title="Table View"
            >
              <Table className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => setViewMode('gallery')}
              className={`p-2 ${viewMode === 'gallery' ? 'bg-gray-100' : 'hover:bg-gray-50'} transition border-x border-gray-200`}
              title="Gallery View"
            >
              <LayoutGrid className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'} rounded-r-md transition`}
              title="List View"
            >
              <List className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Add Player Button */}
          <button
            onClick={onAddPlayer}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
          >
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">No.</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Position</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Age</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Nationality</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">CA</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">PA</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Value</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {players.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500 text-sm">
                    No players found
                  </td>
                </tr>
              ) : (
                players.map((player) => (
                  <tr key={player.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{player.shirtNumber || '-'}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{player.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPositionColor(player.position)}`}>
                        {player.position}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{player.age}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{player.nationality}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{player.currentAbility || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{player.potential || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">£{player.value}M</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onViewPlayer(player)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditPlayer(player)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(player.id)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Gallery View */}
      {viewMode === 'gallery' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.length === 0 ? (
            <div className="col-span-full border border-gray-200 rounded-lg p-8 text-center text-gray-500 text-sm">
              No players found
            </div>
          ) : (
            players.map((player) => (
              <div key={player.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-gray-900">{player.shirtNumber || '?'}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{player.name}</h3>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 ${getPositionColor(player.position)}`}>
                        {player.position}
                      </span>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition flex gap-1">
                    <button
                      onClick={() => onViewPlayer(player)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditPlayer(player)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(player.id)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age</span>
                    <span className="text-gray-900">{player.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nationality</span>
                    <span className="text-gray-900">{player.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CA / PA</span>
                    <span className="text-gray-900">{player.currentAbility || 'N/A'} / {player.potential || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Value</span>
                    <span className="text-gray-900 font-medium">£{player.value}M</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
          {players.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No players found
            </div>
          ) : (
            players.map((player) => (
              <div key={player.id} className="p-4 hover:bg-gray-50 transition group flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-xl font-bold text-gray-900 w-8 text-center">{player.shirtNumber || '-'}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{player.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPositionColor(player.position)}`}>
                        {player.position}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>{player.age} years</span>
                      <span>•</span>
                      <span>{player.nationality}</span>
                      <span>•</span>
                      <span>CA: {player.currentAbility || 'N/A'}</span>
                      <span>•</span>
                      <span>£{player.value}M</span>
                    </div>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition flex gap-1">
                  <button
                    onClick={() => onViewPlayer(player)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEditPlayer(player)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(player.id)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Footer */}
      <div className="text-sm text-gray-500 text-center py-2">
        {players.length} player{players.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
