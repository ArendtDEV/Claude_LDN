import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, DollarSign, Award } from 'lucide-react';
import { playerService } from '../services/playerService';

export function Dashboard() {
  const [stats, setStats] = useState({
    totalPlayers: 0,
    averageAge: 0,
    totalValue: 0,
    averageCurrentAbility: 0,
    positionBreakdown: {} as Record<string, number>,
  });

  useEffect(() => {
    setStats(playerService.getStatistics());
  }, []);

  const positionData = Object.entries(stats.positionBreakdown).map(([position, count]) => ({
    position,
    count,
  }));

  return (
    <div className="space-y-8">
      {/* Stats Cards - Notion Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-50 p-2 rounded-md">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Total Players</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalPlayers}</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-50 p-2 rounded-md">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Average Age</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.averageAge.toFixed(1)}</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-50 p-2 rounded-md">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600">Total Value</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">£{stats.totalValue.toFixed(1)}M</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-50 p-2 rounded-md">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Avg Ability</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.averageCurrentAbility.toFixed(0)}</p>
        </div>
      </div>

      {/* Charts - Notion Style */}
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Position Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={positionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="position" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-200 rounded-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Squad Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Squad Size</span>
              <span className="font-semibold text-gray-900">{stats.totalPlayers} players</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Total Market Value</span>
              <span className="font-semibold text-gray-900">£{stats.totalValue.toFixed(1)}M</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Average Squad Age</span>
              <span className="font-semibold text-gray-900">{stats.averageAge.toFixed(1)} years</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600 text-sm">Average Ability</span>
              <span className="font-semibold text-gray-900">{stats.averageCurrentAbility.toFixed(0)}/200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
