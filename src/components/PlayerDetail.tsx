import { X } from 'lucide-react';
import type { Player } from '../types/Player';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface PlayerDetailProps {
  player: Player;
  onClose: () => void;
}

export function PlayerDetail({ player, onClose }: PlayerDetailProps) {
  const keyAttributes = [
    { name: 'Technical', value: Math.round((player.attributes.technique + player.attributes.passing + player.attributes.dribbling + player.attributes.firstTouch) / 4) },
    { name: 'Mental', value: Math.round((player.attributes.decisions + player.attributes.anticipation + player.attributes.composure + player.attributes.vision) / 4) },
    { name: 'Physical', value: Math.round((player.attributes.pace + player.attributes.stamina + player.attributes.strength + player.attributes.acceleration) / 4) },
    { name: 'Defending', value: Math.round((player.attributes.marking + player.attributes.tackling + player.attributes.positioning) / 3) },
    { name: 'Attacking', value: Math.round((player.attributes.finishing + player.attributes.longShots + player.attributes.offTheBall) / 3) },
  ];

  const attributeCategories = [
    {
      title: 'Technical',
      attributes: [
        { name: 'Corners', value: player.attributes.corners },
        { name: 'Crossing', value: player.attributes.crossing },
        { name: 'Dribbling', value: player.attributes.dribbling },
        { name: 'Finishing', value: player.attributes.finishing },
        { name: 'First Touch', value: player.attributes.firstTouch },
        { name: 'Free Kicks', value: player.attributes.freeKicks },
        { name: 'Heading', value: player.attributes.heading },
        { name: 'Long Shots', value: player.attributes.longShots },
        { name: 'Long Throws', value: player.attributes.longThrows },
        { name: 'Marking', value: player.attributes.marking },
        { name: 'Passing', value: player.attributes.passing },
        { name: 'Penalty Taking', value: player.attributes.penaltyTaking },
        { name: 'Tackling', value: player.attributes.tackling },
        { name: 'Technique', value: player.attributes.technique },
      ],
    },
    {
      title: 'Mental',
      attributes: [
        { name: 'Aggression', value: player.attributes.aggression },
        { name: 'Anticipation', value: player.attributes.anticipation },
        { name: 'Bravery', value: player.attributes.bravery },
        { name: 'Composure', value: player.attributes.composure },
        { name: 'Concentration', value: player.attributes.concentration },
        { name: 'Decisions', value: player.attributes.decisions },
        { name: 'Determination', value: player.attributes.determination },
        { name: 'Flair', value: player.attributes.flair },
        { name: 'Leadership', value: player.attributes.leadership },
        { name: 'Off The Ball', value: player.attributes.offTheBall },
        { name: 'Positioning', value: player.attributes.positioning },
        { name: 'Teamwork', value: player.attributes.teamwork },
        { name: 'Vision', value: player.attributes.vision },
        { name: 'Work Rate', value: player.attributes.workRate },
      ],
    },
    {
      title: 'Physical',
      attributes: [
        { name: 'Acceleration', value: player.attributes.acceleration },
        { name: 'Agility', value: player.attributes.agility },
        { name: 'Balance', value: player.attributes.balance },
        { name: 'Jumping', value: player.attributes.jumping },
        { name: 'Natural Fitness', value: player.attributes.naturalFitness },
        { name: 'Pace', value: player.attributes.pace },
        { name: 'Stamina', value: player.attributes.stamina },
        { name: 'Strength', value: player.attributes.strength },
      ],
    },
  ];

  const getAttributeColor = (value: number) => {
    if (value >= 17) return 'bg-green-500';
    if (value >= 14) return 'bg-blue-500';
    if (value >= 11) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{player.name}</h2>
            <p className="text-gray-600 mt-1">{player.position} • {player.nationality} • {player.age} years old</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Height</p>
              <p className="text-xl font-bold text-gray-900">{player.height} cm</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Weight</p>
              <p className="text-xl font-bold text-gray-900">{player.weight} kg</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Preferred Foot</p>
              <p className="text-xl font-bold text-gray-900">{player.preferredFoot}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Shirt Number</p>
              <p className="text-xl font-bold text-gray-900">{player.shirtNumber || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Market Value</p>
              <p className="text-xl font-bold text-gray-900">£{player.value}M</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Wage</p>
              <p className="text-xl font-bold text-gray-900">£{player.wage}k/w</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Current Ability</p>
              <p className="text-xl font-bold text-gray-900">{player.currentAbility || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Potential</p>
              <p className="text-xl font-bold text-gray-900">{player.potential || 'N/A'}</p>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Attribute Overview</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={keyAttributes}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={90} domain={[0, 20]} />
                <Radar name={player.name} dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Attributes */}
          <div className="space-y-6">
            {attributeCategories.map((category) => (
              <div key={category.title} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.attributes.map((attr) => (
                    <div key={attr.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{attr.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`${getAttributeColor(attr.value)} h-2 rounded-full`}
                            style={{ width: `${(attr.value / 20) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-900 w-6">{attr.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          {player.notes && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Notes</h3>
              <p className="text-gray-700">{player.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
