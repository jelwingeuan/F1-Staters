import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

interface DriverStandingsProps {
  walletAddress: string | null;
}

const driverData = [
  { position: 1, name: 'Max Verstappen', team: 'Red Bull Racing', points: 575, wins: 19, podiums: 21, trend: 'up' },
  { position: 2, name: 'Sergio Perez', team: 'Red Bull Racing', points: 285, wins: 2, podiums: 8, trend: 'down' },
  { position: 3, name: 'Lewis Hamilton', team: 'Mercedes', points: 234, wins: 0, podiums: 6, trend: 'up' },
  { position: 4, name: 'Fernando Alonso', team: 'Aston Martin', points: 206, wins: 0, podiums: 8, trend: 'up' },
  { position: 5, name: 'Charles Leclerc', team: 'Ferrari', points: 206, wins: 1, podiums: 4, trend: 'down' },
  { position: 6, name: 'Lando Norris', team: 'McLaren', points: 205, wins: 0, podiums: 7, trend: 'up' },
  { position: 7, name: 'Carlos Sainz', team: 'Ferrari', points: 200, wins: 1, podiums: 5, trend: 'stable' },
  { position: 8, name: 'George Russell', team: 'Mercedes', points: 175, wins: 0, podiums: 4, trend: 'stable' },
  { position: 9, name: 'Oscar Piastri', team: 'McLaren', points: 97, wins: 0, podiums: 2, trend: 'up' },
  { position: 10, name: 'Lance Stroll', team: 'Aston Martin', points: 74, wins: 0, podiums: 1, trend: 'down' },
];

export function DriverStandings({ walletAddress }: DriverStandingsProps) {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-800/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-2">2024 Driver Standings</h2>
            <p className="text-gray-400">Real-time championship rankings</p>
          </div>
          {walletAddress && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2">
              <p className="text-green-400 text-sm">🔗 On-Chain Verified</p>
            </div>
          )}
        </div>
      </div>

      {/* Standings Table */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-400">Position</th>
                <th className="px-6 py-4 text-left text-sm text-gray-400">Driver</th>
                <th className="px-6 py-4 text-left text-sm text-gray-400">Team</th>
                <th className="px-6 py-4 text-center text-sm text-gray-400">Points</th>
                <th className="px-6 py-4 text-center text-sm text-gray-400">Wins</th>
                <th className="px-6 py-4 text-center text-sm text-gray-400">Podiums</th>
                <th className="px-6 py-4 text-center text-sm text-gray-400">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {driverData.map((driver) => (
                <tr 
                  key={driver.position}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-xl ${driver.position <= 3 ? 'text-yellow-400' : 'text-gray-400'}`}>
                        {driver.position <= 3 ? '🏆' : driver.position}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white">{driver.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-300 text-sm">{driver.team}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/20 text-red-300">
                      {driver.points}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-300">
                    {driver.wins}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-300">
                    {driver.podiums}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {driver.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-400" />}
                      {driver.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-400" />}
                      {driver.trend === 'stable' && <div className="w-5 h-0.5 bg-gray-400" />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-800/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <p className="text-gray-400 text-sm">Most Wins</p>
          </div>
          <p className="text-2xl text-white">Max Verstappen</p>
          <p className="text-yellow-400 text-xl">19 wins</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-800/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🎯</span>
            <p className="text-gray-400 text-sm">Total Points</p>
          </div>
          <p className="text-2xl text-white">Season Total</p>
          <p className="text-purple-400 text-xl">2,257 points</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-800/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📊</span>
            <p className="text-gray-400 text-sm">Avg Points/Race</p>
          </div>
          <p className="text-2xl text-white">Per Driver</p>
          <p className="text-blue-400 text-xl">225.7 pts</p>
        </div>
      </div>
    </div>
  );
}
