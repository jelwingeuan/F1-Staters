import { useState, useEffect } from 'react';
import { Zap, Gauge, Timer, Flag } from 'lucide-react';

interface LiveRaceStatsProps {
  walletAddress: string | null;
}

const livePositions = [
  { position: 1, driver: 'M. Verstappen', team: 'Red Bull', gap: 'Leader', lastLap: '1:32.456', sector1: '27.123', sector2: '35.678', sector3: '29.655' },
  { position: 2, driver: 'S. Perez', team: 'Red Bull', gap: '+2.345', lastLap: '1:32.801', sector1: '27.234', sector2: '35.789', sector3: '29.778' },
  { position: 3, driver: 'L. Hamilton', team: 'Mercedes', gap: '+8.901', lastLap: '1:33.357', sector1: '27.456', sector2: '35.912', sector3: '29.989' },
  { position: 4, driver: 'F. Alonso', team: 'Aston Martin', gap: '+12.234', lastLap: '1:33.690', sector1: '27.567', sector2: '36.012', sector3: '30.111' },
  { position: 5, driver: 'C. Leclerc', team: 'Ferrari', gap: '+15.678', lastLap: '1:34.134', sector1: '27.678', sector2: '36.234', sector3: '30.222' },
];

export function LiveRaceStats({ walletAddress }: LiveRaceStatsProps) {
  const [currentLap, setCurrentLap] = useState(42);
  const [raceStatus, setRaceStatus] = useState<'live' | 'paused' | 'finished'>('live');

  useEffect(() => {
    if (raceStatus !== 'live') return;

    const interval = setInterval(() => {
      setCurrentLap(prev => {
        if (prev >= 58) {
          setRaceStatus('finished');
          return 58;
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [raceStatus]);

  return (
    <div className="space-y-6">
      {/* Live Header */}
      <div className="bg-gradient-to-r from-red-900/30 to-orange-800/20 border border-red-800/30 rounded-xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {raceStatus === 'live' && (
              <div className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white text-sm">LIVE</span>
              </div>
            )}
            <div>
              <h2 className="text-2xl">Monaco Grand Prix</h2>
              <p className="text-gray-400">Circuit de Monaco • May 26, 2024</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-center">
              <p className="text-gray-400 text-xs mb-1">Current Lap</p>
              <p className="text-white text-xl">{currentLap}/58</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-center">
              <p className="text-gray-400 text-xs mb-1">Weather</p>
              <p className="text-white text-xl">🌤️ 24°C</p>
            </div>
          </div>
        </div>

        {/* Race Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 transition-all duration-1000"
              style={{ width: `${(currentLap / 58) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Live Positions */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <div className="bg-gray-800/50 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-400" />
            <h3 className="text-lg">Live Positions</h3>
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {livePositions.map((entry) => (
            <div 
              key={entry.position}
              className="px-6 py-4 hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <span className={`text-xl ${entry.position <= 3 ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {entry.position <= 3 ? '🏆' : entry.position}
                  </span>
                  <div>
                    <p className="text-white">{entry.driver}</p>
                    <p className="text-gray-400 text-sm">{entry.team}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">Gap</p>
                  <p className={`${entry.gap === 'Leader' ? 'text-green-400' : 'text-gray-300'}`}>
                    {entry.gap}
                  </p>
                </div>
              </div>

              {/* Sector Times */}
              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                <div className="bg-gray-800/50 rounded px-2 py-1">
                  <p className="text-gray-400 text-xs">S1</p>
                  <p className="text-white">{entry.sector1}</p>
                </div>
                <div className="bg-gray-800/50 rounded px-2 py-1">
                  <p className="text-gray-400 text-xs">S2</p>
                  <p className="text-white">{entry.sector2}</p>
                </div>
                <div className="bg-gray-800/50 rounded px-2 py-1">
                  <p className="text-gray-400 text-xs">S3</p>
                  <p className="text-white">{entry.sector3}</p>
                </div>
                <div className="bg-purple-900/20 border border-purple-800/30 rounded px-2 py-1">
                  <p className="text-purple-400 text-xs">Last</p>
                  <p className="text-white">{entry.lastLap}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-800/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-green-400" />
            <p className="text-gray-400 text-sm">Fastest Lap</p>
          </div>
          <p className="text-xl text-white">M. Verstappen</p>
          <p className="text-green-400 text-2xl">1:32.456</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-800/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Gauge className="w-6 h-6 text-blue-400" />
            <p className="text-gray-400 text-sm">Top Speed</p>
          </div>
          <p className="text-xl text-white">DRS Zone</p>
          <p className="text-blue-400 text-2xl">324 km/h</p>
        </div>

        <div className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border border-orange-800/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Timer className="w-6 h-6 text-orange-400" />
            <p className="text-gray-400 text-sm">Pit Stops</p>
          </div>
          <p className="text-xl text-white">Total Made</p>
          <p className="text-orange-400 text-2xl">8 stops</p>
        </div>
      </div>

      {/* Web3 Integration Info */}
      {walletAddress && (
        <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-800/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🔗</span>
            <h3 className="text-lg">Web3 Features Active</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Your wallet is connected. Live race data is being verified on-chain for transparency and immutability.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-800/50 rounded-lg px-4 py-3">
              <p className="text-gray-400 mb-1">Data Blocks</p>
              <p className="text-cyan-400">2,847 verified</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg px-4 py-3">
              <p className="text-gray-400 mb-1">Update Rate</p>
              <p className="text-cyan-400">Real-time</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
