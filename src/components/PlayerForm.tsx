import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Player, Position, Foot, PlayerFormData } from '../types/Player';
import { playerService } from '../services/playerService';

interface PlayerFormProps {
  player?: Player;
  onClose: () => void;
  onSave: () => void;
}

export function PlayerForm({ player, onClose, onSave }: PlayerFormProps) {
  const [formData, setFormData] = useState<Partial<PlayerFormData>>({
    name: '',
    age: 20,
    nationality: '',
    position: 'CM',
    preferredFoot: 'Right',
    height: 180,
    weight: 75,
    shirtNumber: undefined,
    value: 1.0,
    wage: 10,
    currentAbility: 100,
    potential: 120,
    attributes: {
      corners: 10,
      crossing: 10,
      dribbling: 10,
      finishing: 10,
      firstTouch: 10,
      freeKicks: 10,
      heading: 10,
      longShots: 10,
      longThrows: 10,
      marking: 10,
      passing: 10,
      penaltyTaking: 10,
      tackling: 10,
      technique: 10,
      aggression: 10,
      anticipation: 10,
      bravery: 10,
      composure: 10,
      concentration: 10,
      decisions: 10,
      determination: 10,
      flair: 10,
      leadership: 10,
      offTheBall: 10,
      positioning: 10,
      teamwork: 10,
      vision: 10,
      workRate: 10,
      acceleration: 10,
      agility: 10,
      balance: 10,
      jumping: 10,
      naturalFitness: 10,
      pace: 10,
      stamina: 10,
      strength: 10,
    },
  });

  const positions: Position[] = ['GK', 'LB', 'CB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'LM', 'RM', 'AM', 'LW', 'RW', 'ST', 'CF'];
  const feet: Foot[] = ['Left', 'Right', 'Both'];

  useEffect(() => {
    if (player) {
      setFormData(player);
    }
  }, [player]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player) {
      playerService.updatePlayer(player.id, formData as PlayerFormData);
    } else {
      playerService.addPlayer(formData as PlayerFormData);
    }
    onSave();
  };

  const handleAttributeChange = (attrName: string, value: number) => {
    setFormData({
      ...formData,
      attributes: {
        ...formData.attributes!,
        [attrName]: Math.max(1, Math.min(20, value)),
      },
    });
  };

  const technicalAttributes = [
    'corners', 'crossing', 'dribbling', 'finishing', 'firstTouch', 'freeKicks',
    'heading', 'longShots', 'longThrows', 'marking', 'passing', 'penaltyTaking',
    'tackling', 'technique'
  ];

  const mentalAttributes = [
    'aggression', 'anticipation', 'bravery', 'composure', 'concentration',
    'decisions', 'determination', 'flair', 'leadership', 'offTheBall',
    'positioning', 'teamwork', 'vision', 'workRate'
  ];

  const physicalAttributes = [
    'acceleration', 'agility', 'balance', 'jumping', 'naturalFitness',
    'pace', 'stamina', 'strength'
  ];

  const formatAttributeName = (name: string) => {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {player ? 'Edit Player' : 'Add New Player'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
                <input
                  type="text"
                  required
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                <input
                  type="number"
                  required
                  min="15"
                  max="45"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value as Position })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Foot</label>
                <select
                  value={formData.preferredFoot}
                  onChange={(e) => setFormData({ ...formData, preferredFoot: e.target.value as Foot })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {feet.map(foot => <option key={foot} value={foot}>{foot}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shirt Number</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={formData.shirtNumber || ''}
                  onChange={(e) => setFormData({ ...formData, shirtNumber: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm) *</label>
                <input
                  type="number"
                  required
                  min="150"
                  max="220"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
                <input
                  type="number"
                  required
                  min="50"
                  max="120"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value (£M)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wage (£k/week)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.wage}
                  onChange={(e) => setFormData({ ...formData, wage: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Ability (1-200)</label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={formData.currentAbility}
                  onChange={(e) => setFormData({ ...formData, currentAbility: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Potential (1-200)</label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={formData.potential}
                  onChange={(e) => setFormData({ ...formData, potential: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Technical Attributes */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Technical Attributes (1-20)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {technicalAttributes.map(attr => (
                <div key={attr}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {formatAttributeName(attr)}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={(formData.attributes as any)?.[attr] || 10}
                    onChange={(e) => handleAttributeChange(attr, parseInt(e.target.value))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mental Attributes */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Mental Attributes (1-20)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mentalAttributes.map(attr => (
                <div key={attr}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {formatAttributeName(attr)}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={(formData.attributes as any)?.[attr] || 10}
                    onChange={(e) => handleAttributeChange(attr, parseInt(e.target.value))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Physical Attributes (1-20)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {physicalAttributes.map(attr => (
                <div key={attr}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {formatAttributeName(attr)}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={(formData.attributes as any)?.[attr] || 10}
                    onChange={(e) => handleAttributeChange(attr, parseInt(e.target.value))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Notes</h3>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any notes about this player..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {player ? 'Update Player' : 'Add Player'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
