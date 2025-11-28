import { useState } from 'react';
import { motion } from 'motion/react';
import { useF1Stats } from '../context/F1StatsContext';
import { GitCompare, TrendingUp, Award } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export function Comparison() {
  const { drivers } = useF1Stats();
  const [driver1, setDriver1] = useState(drivers[0]);
  const [driver2, setDriver2] = useState(drivers[1]);

  const comparisonData = [
    {
      category: 'Points',
      driver1: driver1.points / 10,
      driver2: driver2.points / 10,
    },
    {
      category: 'Wins',
      driver1: driver1.wins * 5,
      driver2: driver2.wins * 5,
    },
    {
      category: 'Podiums',
      driver1: driver1.podiums * 4,
      driver2: driver2.podiums * 4,
    },
    {
      category: 'Poles',
      driver1: driver1.poles * 5,
      driver2: driver2.poles * 5,
    },
    {
      category: 'Consistency',
      driver1: driver1.consistency,
      driver2: driver2.consistency,
    },
  ];

  const statsComparison = [
    { stat: 'Championship Points', driver1: driver1.points, driver2: driver2.points },
    { stat: 'Race Wins', driver1: driver1.wins, driver2: driver2.wins },
    { stat: 'Podium Finishes', driver1: driver1.podiums, driver2: driver2.podiums },
    { stat: 'Pole Positions', driver1: driver1.poles, driver2: driver2.poles },
    { stat: 'Fastest Laps', driver1: driver1.fastestLaps, driver2: driver2.fastestLaps },
    { stat: 'DNFs', driver1: driver1.dnfs, driver2: driver2.dnfs },
    { stat: 'Avg Position', driver1: driver1.avgPosition, driver2: driver2.avgPosition },
    { stat: 'Points/Race', driver1: driver1.pointsPerRace, driver2: driver2.pointsPerRace },
  ];

  const barChartData = statsComparison.slice(0, 5).map(stat => ({
    stat: stat.stat,
    [driver1.name]: stat.driver1,
    [driver2.name]: stat.driver2,
  }));

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <GitCompare className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl">Driver Comparison</h1>
        </div>
        <p className="text-gray-400">Head-to-head performance analysis</p>
      </motion.div>

      {/* Driver Selectors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl blur-xl" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-red-600/30 rounded-2xl p-6">
            <label className="block text-sm text-gray-400 mb-3">Driver 1</label>
            <select
              value={driver1.id}
              onChange={(e) => setDriver1(drivers.find(d => d.id === parseInt(e.target.value))!)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-600/50"
            >
              {drivers.map(driver => (
                <option key={driver.id} value={driver.id} className="bg-gray-900">
                  {driver.name} - {driver.team}
                </option>
              ))}
            </select>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{driver1.nationality}</span>
                <div>
                  <p className="text-sm text-gray-400">{driver1.team}</p>
                  <p className="text-sm text-gray-500">#{driver1.number}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Points</p>
                <p className="text-2xl text-red-500">{driver1.points}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-blue-600/30 rounded-2xl p-6">
            <label className="block text-sm text-gray-400 mb-3">Driver 2</label>
            <select
              value={driver2.id}
              onChange={(e) => setDriver2(drivers.find(d => d.id === parseInt(e.target.value))!)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-600/50"
            >
              {drivers.map(driver => (
                <option key={driver.id} value={driver.id} className="bg-gray-900">
                  {driver.name} - {driver.team}
                </option>
              ))}
            </select>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{driver2.nationality}</span>
                <div>
                  <p className="text-sm text-gray-400">{driver2.team}</p>
                  <p className="text-sm text-gray-500">#{driver2.number}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Points</p>
                <p className="text-2xl text-blue-500">{driver2.points}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl blur-xl" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg mb-4">Performance Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={comparisonData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="category" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <PolarRadiusAxis stroke="#9ca3af" />
                <Radar name={driver1.name} dataKey="driver1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} strokeWidth={2} />
                <Radar name={driver2.name} dataKey="driver2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-yellow-600/10 rounded-2xl blur-xl" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg mb-4">Statistics Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis type="number" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <YAxis type="category" dataKey="stat" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Bar dataKey={driver1.name} fill="#ef4444" radius={[0, 4, 4, 0]} />
                <Bar dataKey={driver2.name} fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Detailed Stats Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-gray-700/20 rounded-2xl blur-xl" />
        <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg">Detailed Statistics</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-400">Metric</th>
                  <th className="px-6 py-4 text-center text-sm text-red-400">{driver1.name}</th>
                  <th className="px-6 py-4 text-center text-sm text-gray-400">Winner</th>
                  <th className="px-6 py-4 text-center text-sm text-blue-400">{driver2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {statsComparison.map((stat, index) => {
                  const winner = stat.stat === 'DNFs' || stat.stat === 'Avg Position'
                    ? stat.driver1 < stat.driver2 ? driver1.name : driver2.name
                    : stat.driver1 > stat.driver2 ? driver1.name : driver2.name;
                  
                  return (
                    <motion.tr
                      key={stat.stat}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-300">{stat.stat}</td>
                      <td className={`px-6 py-4 text-center ${winner === driver1.name ? 'text-red-400' : 'text-gray-500'}`}>
                        {stat.driver1}
                        {winner === driver1.name && ' ✓'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {winner === driver1.name ? (
                          <TrendingUp className="w-5 h-5 text-red-500 mx-auto" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-blue-500 mx-auto rotate-180" />
                        )}
                      </td>
                      <td className={`px-6 py-4 text-center ${winner === driver2.name ? 'text-blue-400' : 'text-gray-500'}`}>
                        {stat.driver2}
                        {winner === driver2.name && ' ✓'}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
