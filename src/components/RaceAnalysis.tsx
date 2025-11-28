import { useState } from 'react';
import { motion } from 'motion/react';
import { useF1Stats } from '../context/F1StatsContext';
import { MapPin, Calendar, Flag, Zap, Clock, CheckCircle2 } from 'lucide-react';

export function RaceAnalysis() {
  const { races } = useF1Stats();
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'upcoming'>('all');

  const filteredRaces = races.filter(race => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'completed') return race.completed;
    if (filterStatus === 'upcoming') return !race.completed;
    return true;
  });

  const completedCount = races.filter(r => r.completed).length;
  const upcomingCount = races.filter(r => !r.completed).length;

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl mb-2">Race Analysis</h1>
        <p className="text-gray-400">Detailed race statistics and circuit data</p>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between flex-wrap gap-4"
      >
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filterStatus === 'all'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            All Races ({races.length})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filterStatus === 'completed'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setFilterStatus('upcoming')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filterStatus === 'upcoming'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Upcoming ({upcomingCount})
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-white/10">
            <span className="text-sm text-gray-400">Season Progress: </span>
            <span className="text-white">{((completedCount / races.length) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </motion.div>

      {/* Race Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRaces.map((race, index) => (
          <motion.div
            key={race.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative group"
          >
            <div className={`absolute inset-0 rounded-2xl blur-xl transition-all ${
              race.completed
                ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20'
                : 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20'
            }`} />
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    race.completed ? 'bg-green-600/20' : 'bg-blue-600/20'
                  }`}>
                    <span className="text-xl">{race.completed ? '✓' : race.id}</span>
                  </div>
                  <div>
                    <h3 className="text-lg mb-1">{race.name}</h3>
                    <p className="text-sm text-gray-400">{race.circuit}</p>
                  </div>
                </div>
                
                {race.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Clock className="w-6 h-6 text-blue-500 animate-pulse" />
                )}
              </div>

              {/* Race Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{race.date}, 2024</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Flag className="w-4 h-4" />
                  <span>{race.laps} laps</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{race.distance.toFixed(1)} km</span>
                </div>
                {race.completed && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Zap className="w-4 h-4" />
                    <span>{race.avgSpeed.toFixed(1)} km/h</span>
                  </div>
                )}
              </div>

              {/* Winner Info */}
              {race.completed ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-600/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🏆</span>
                      <span className="text-sm text-gray-400">Winner</span>
                    </div>
                    <span className="text-yellow-500">{race.winner}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-400">Fastest Lap</span>
                    </div>
                    <span className="text-purple-500">{race.fastestLap}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-600/20 rounded-lg">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-pulse" />
                    <p className="text-sm text-blue-400">Race scheduled</p>
                  </div>
                </div>
              )}

              {/* Race Stats (for completed races) */}
              {race.completed && (
                <div className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Laps</p>
                    <p className="text-sm text-white">{race.laps}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Distance</p>
                    <p className="text-sm text-white">{race.distance.toFixed(0)}km</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Avg Speed</p>
                    <p className="text-sm text-white">{race.avgSpeed.toFixed(0)}km/h</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">Total Races</p>
          <p className="text-3xl text-white">{races.length}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">Completed</p>
          <p className="text-3xl text-green-500">{completedCount}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">Upcoming</p>
          <p className="text-3xl text-blue-500">{upcomingCount}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">Total Distance</p>
          <p className="text-3xl text-purple-500">
            {races.reduce((sum, r) => sum + r.distance, 0).toFixed(0)}km
          </p>
        </div>
      </motion.div>
    </div>
  );
}
