import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useF1Stats } from '../context/F1StatsContext';
import { TrendingUp, Award, Zap, Target, ChevronRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DriverAnalytics() {
  const { drivers, setSelectedDriver } = useF1Stats();
  const [selectedDriverLocal, setSelectedDriverLocal] = useState(drivers[0]);
  const [sortBy, setSortBy] = useState<'points' | 'wins' | 'consistency'>('points');

  const sortedDrivers = [...drivers].sort((a, b) => b[sortBy] - a[sortBy]);

  const performanceData = selectedDriverLocal.performance.map((points, index) => ({
    race: index + 1,
    points: points,
    cumulative: selectedDriverLocal.performance.slice(0, index + 1).reduce((a, b) => a + b, 0)
  }));

  const statsComparison = [
    { stat: 'Points', value: selectedDriverLocal.points, max: 600 },
    { stat: 'Wins', value: selectedDriverLocal.wins, max: 21 },
    { stat: 'Podiums', value: selectedDriverLocal.podiums, max: 21 },
    { stat: 'Poles', value: selectedDriverLocal.poles, max: 21 },
    { stat: 'Consistency', value: selectedDriverLocal.consistency, max: 100 },
  ];

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl mb-2">Driver Analytics</h1>
        <p className="text-gray-400">In-depth performance analysis and statistics</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Driver List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg">Drivers</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-red-600/50"
              >
                <option value="points">Points</option>
                <option value="wins">Wins</option>
                <option value="consistency">Consistency</option>
              </select>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {sortedDrivers.map((driver, index) => (
                <motion.button
                  key={driver.id}
                  onClick={() => {
                    setSelectedDriverLocal(driver);
                    setSelectedDriver(driver);
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedDriverLocal.id === driver.id
                      ? 'bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-600/30'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-xl ${index < 3 ? 'text-2xl' : ''}`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : driver.nationality}
                      </span>
                      <div>
                        <p className="text-sm">{driver.name}</p>
                        <p className="text-xs text-gray-400">{driver.team}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      selectedDriverLocal.id === driver.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Points</span>
                    <span className="text-red-400">{driver.points}</span>
                  </div>
                  
                  <div className="mt-2 w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-orange-600"
                      style={{ width: `${(driver[sortBy] / sortedDrivers[0][sortBy]) * 100}%` }}
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Driver Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDriverLocal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl blur-xl" />
              <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{selectedDriverLocal.nationality}</span>
                      <div>
                        <h2 className="text-2xl">{selectedDriverLocal.name}</h2>
                        <p className="text-gray-400">{selectedDriverLocal.team} • #{selectedDriverLocal.number}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Championship Position</p>
                    <p className="text-4xl text-red-500">P{drivers.findIndex(d => d.id === selectedDriverLocal.id) + 1}</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <p className="text-xs text-gray-400">Points</p>
                    </div>
                    <p className="text-2xl text-yellow-500">{selectedDriverLocal.points}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <p className="text-xs text-gray-400">Wins</p>
                    </div>
                    <p className="text-2xl text-green-500">{selectedDriverLocal.wins}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <p className="text-xs text-gray-400">Poles</p>
                    </div>
                    <p className="text-2xl text-purple-500">{selectedDriverLocal.poles}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <p className="text-xs text-gray-400">Consistency</p>
                    </div>
                    <p className="text-2xl text-blue-500">{selectedDriverLocal.consistency}%</p>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="mb-4">Race-by-Race Performance</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                      <XAxis dataKey="race" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                      <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Line type="monotone" dataKey="points" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} name="Points" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Stats Breakdown */}
            <motion.div
              key={`stats-${selectedDriverLocal.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                {statsComparison.map((stat) => (
                  <div key={stat.stat}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">{stat.stat}</span>
                      <span className="text-white">{stat.value}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-red-600 to-orange-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Additional Stats */}
            <motion.div
              key={`additional-${selectedDriverLocal.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Podiums</p>
                <p className="text-2xl text-orange-500">{selectedDriverLocal.podiums}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Fastest Laps</p>
                <p className="text-2xl text-purple-500">{selectedDriverLocal.fastestLaps}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Avg Position</p>
                <p className="text-2xl text-blue-500">{selectedDriverLocal.avgPosition.toFixed(1)}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">DNFs</p>
                <p className="text-2xl text-red-500">{selectedDriverLocal.dnfs}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}