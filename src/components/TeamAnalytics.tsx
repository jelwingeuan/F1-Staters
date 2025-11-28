import { useState } from 'react';
import { motion } from 'motion/react';
import { useF1Stats } from '../context/F1StatsContext';
import { Building2, Trophy, Gauge, Clock } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function TeamAnalytics() {
  const { teams } = useF1Stats();
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  const performanceData = selectedTeam.performance.map((points, index) => ({
    race: index + 1,
    points: points,
    cumulative: selectedTeam.performance.slice(0, index + 1).reduce((a, b) => a + b, 0)
  }));

  const teamColors: Record<string, string> = {
    'Red Bull Racing': '#0600ef',
    'Mercedes': '#00d2be',
    'Ferrari': '#dc0000',
    'McLaren': '#ff8700',
    'Aston Martin': '#006f62',
  };

  const allTeamsData = selectedTeam.performance.map((_, index) => {
    const data: any = { race: index + 1 };
    teams.forEach(team => {
      data[team.name] = team.performance.slice(0, index + 1).reduce((a, b) => a + b, 0);
    });
    return data;
  });

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl mb-2">Team Analytics</h1>
        <p className="text-gray-400">Constructor championship analysis</p>
      </motion.div>

      {/* Team Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex gap-3 overflow-x-auto pb-4">
          {teams.map((team) => (
            <motion.button
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all whitespace-nowrap ${
                selectedTeam.id === team.id
                  ? 'bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-600/50'
                  : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: teamColors[team.name] || '#ef4444' }}
              />
              <div className="text-left">
                <p className="text-sm">{team.name}</p>
                <p className="text-xs text-gray-400">{team.points} pts</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl blur-xl" />
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: teamColors[selectedTeam.name] + '40' }}
                >
                  <Building2 className="w-6 h-6" style={{ color: teamColors[selectedTeam.name] }} />
                </div>
                <div>
                  <h2 className="text-xl">{selectedTeam.name}</h2>
                  <p className="text-sm text-gray-400">Constructor Stats</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-400">Championship Points</span>
                  </div>
                  <span className="text-xl text-yellow-500">{selectedTeam.points}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏆</span>
                    <span className="text-sm text-gray-400">Race Wins</span>
                  </div>
                  <span className="text-xl text-green-500">{selectedTeam.wins}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🥇</span>
                    <span className="text-sm text-gray-400">Pole Positions</span>
                  </div>
                  <span className="text-xl text-purple-500">{selectedTeam.poles}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏅</span>
                    <span className="text-sm text-gray-400">Total Podiums</span>
                  </div>
                  <span className="text-xl text-orange-500">{selectedTeam.podiums}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-400">Reliability Score</span>
                  </div>
                  <span className="text-xl text-blue-500">{selectedTeam.reliability}%</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-400">Avg Pit Stop</span>
                  </div>
                  <span className="text-xl text-red-500">{selectedTeam.avgPitStop}s</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Team Performance Over Time */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl" />
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg mb-4">Season Performance Progression</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorTeam" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={teamColors[selectedTeam.name] || '#ef4444'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={teamColors[selectedTeam.name] || '#ef4444'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    stroke={teamColors[selectedTeam.name] || '#ef4444'}
                    fillOpacity={1}
                    fill="url(#colorTeam)"
                    strokeWidth={3}
                    name="Total Points"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Constructor Championship Battle */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-2xl blur-xl" />
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg mb-4">Constructor Championship Battle</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={allTeamsData}>
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
                  <Legend />
                  {teams.map((team) => (
                    <Line
                      key={team.id}
                      type="monotone"
                      dataKey={team.name}
                      stroke={teamColors[team.name] || '#ef4444'}
                      strokeWidth={selectedTeam.id === team.id ? 3 : 2}
                      opacity={selectedTeam.id === team.id ? 1 : 0.4}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h4 className="text-sm text-gray-400 mb-2">Points Per Race</h4>
              <p className="text-3xl text-red-500">{(selectedTeam.points / 20).toFixed(1)}</p>
              <p className="text-xs text-gray-500 mt-2">Average points scored</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h4 className="text-sm text-gray-400 mb-2">Win Rate</h4>
              <p className="text-3xl text-green-500">{((selectedTeam.wins / 20) * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-500 mt-2">Race win percentage</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h4 className="text-sm text-gray-400 mb-2">Podium Rate</h4>
              <p className="text-3xl text-orange-500">{((selectedTeam.podiums / 40) * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-500 mt-2">Podium finish rate</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h4 className="text-sm text-gray-400 mb-2">Performance Index</h4>
              <p className="text-3xl text-purple-500">{(selectedTeam.reliability * selectedTeam.wins / 10).toFixed(0)}</p>
              <p className="text-xs text-gray-500 mt-2">Combined metric</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
