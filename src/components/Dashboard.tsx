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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">XITA LDN Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Players</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalPlayers}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Age</p>
              <p className="text-3xl font-bold text-gray-900">{stats.averageAge.toFixed(1)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-3xl font-bold text-gray-900">£{stats.totalValue.toFixed(1)}M</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Ability</p>
              <p className="text-3xl font-bold text-gray-900">{stats.averageCurrentAbility.toFixed(0)}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Position Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={positionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="position" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Squad Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Squad Size</span>
              <span className="font-bold text-gray-900">{stats.totalPlayers} players</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Market Value</span>
              <span className="font-bold text-gray-900">£{stats.totalValue.toFixed(1)}M</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Average Squad Age</span>
              <span className="font-bold text-gray-900">{stats.averageAge.toFixed(1)} years</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Average Ability</span>
              <span className="font-bold text-gray-900">{stats.averageCurrentAbility.toFixed(0)}/200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
