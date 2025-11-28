import { motion } from 'motion/react';
import { useF1Stats } from '../context/F1StatsContext';
import { Trophy, TrendingUp, Flag, Zap, Award, Target } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export function Dashboard() {
  const { drivers, teams, races } = useF1Stats();

  const topDrivers = drivers.slice(0, 5);
  const topTeams = teams.slice(0, 3);
  const completedRaces = races.filter(r => r.completed);

  // Championship progression data
  const championshipData = topDrivers[0]?.performance.map((points, index) => ({
    race: index + 1,
    verstappen: topDrivers[0]?.performance.slice(0, index + 1).reduce((a, b) => a + b, 0) || 0,
    perez: topDrivers[1]?.performance.slice(0, index + 1).reduce((a, b) => a + b, 0) || 0,
    hamilton: topDrivers[2]?.performance.slice(0, index + 1).reduce((a, b) => a + b, 0) || 0,
  })) || [];

  // Team performance comparison
  const teamPerformanceData = teams.map(team => ({
    name: team.name.split(' ')[0],
    points: team.points,
    wins: team.wins * 25,
    podiums: team.podiums * 10,
  }));

  // Driver stats radar
  const driverRadarData = [
    { stat: 'Wins', value: (topDrivers[0]?.wins || 0) },
    { stat: 'Podiums', value: (topDrivers[0]?.podiums || 0) },
    { stat: 'Poles', value: (topDrivers[0]?.poles || 0) },
    { stat: 'Fastest Laps', value: (topDrivers[0]?.fastestLaps || 0) },
    { stat: 'Consistency', value: (topDrivers[0]?.consistency || 0) / 10 },
  ];

  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6"
    >
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">Leader</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Championship Leader</h3>
            <p className="text-2xl mb-1">{topDrivers[0]?.name}</p>
            <p className="text-3xl text-yellow-500">{topDrivers[0]?.points} pts</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Flag className="w-8 h-8 text-red-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Wins</h3>
            <p className="text-2xl mb-1">{topDrivers[0]?.name.split(' ')[1]}</p>
            <p className="text-3xl text-red-500">{topDrivers[0]?.wins} wins</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-blue-500" />
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">Team</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Constructor Leader</h3>
            <p className="text-2xl mb-1">{topTeams[0]?.name}</p>
            <p className="text-3xl text-blue-500">{topTeams[0]?.points} pts</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-purple-500" />
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">{completedRaces.length}/{races.length}</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Races Completed</h3>
            <p className="text-2xl mb-1">Season Progress</p>
            <p className="text-3xl text-purple-500">{Math.round((completedRaces.length / races.length) * 100)}%</p>
          </div>
        </motion.div>
      </div>

      {/* Championship Progression */}
      <motion.div variants={item} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-blue-600/10 rounded-2xl blur-xl" />
        <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl mb-1">Championship Progression</h2>
              <p className="text-gray-400 text-sm">Cumulative points throughout the season</p>
            </div>
            <Target className="w-6 h-6 text-gray-400" />
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={championshipData}>
              <defs>
                <linearGradient id="colorVerstappen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPerez" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorHamilton" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
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
              <Legend />
              <Area type="monotone" dataKey="verstappen" stroke="#ef4444" fillOpacity={1} fill="url(#colorVerstappen)" strokeWidth={2} name="Verstappen" />
              <Area type="monotone" dataKey="perez" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPerez)" strokeWidth={2} name="Perez" />
              <Area type="monotone" dataKey="hamilton" stroke="#10b981" fillOpacity={1} fill="url(#colorHamilton)" strokeWidth={2} name="Hamilton" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Team Performance & Driver Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-yellow-600/10 rounded-2xl blur-xl" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl mb-6">Team Performance Breakdown</h2>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
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
                <Bar dataKey="points" fill="#ef4444" name="Points" radius={[8, 8, 0, 0]} />
                <Bar dataKey="wins" fill="#f97316" name="Win Value" radius={[8, 8, 0, 0]} />
                <Bar dataKey="podiums" fill="#f59e0b" name="Podium Value" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl blur-xl" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl mb-6">Leader Performance Metrics</h2>
            
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={driverRadarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="stat" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <PolarRadiusAxis stroke="#9ca3af" />
                <Radar name={topDrivers[0]?.name} dataKey="value" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topDrivers.slice(0, 4).map((driver, index) => (
          <motion.div
            key={driver.id}
            variants={item}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                  index === 1 ? 'bg-gray-400/20 text-gray-400' :
                  index === 2 ? 'bg-orange-600/20 text-orange-600' :
                  'bg-blue-600/20 text-blue-600'
                }`}>
                  <span className="text-xl">{index + 1}</span>
                </div>
                <span className="text-2xl">{driver.nationality}</span>
              </div>
              <p className="text-sm text-gray-400 mb-1">{driver.team}</p>
              <p className="mb-2">{driver.name}</p>
              <p className="text-xl text-red-500">{driver.points} pts</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
