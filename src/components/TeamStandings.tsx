import { Building2, Award } from 'lucide-react';

interface TeamStandingsProps {
  walletAddress: string | null;
}

const teamData = [
  { position: 1, name: 'Red Bull Racing', points: 860, wins: 21, poles: 18, color: 'bg-blue-600' },
  { position: 2, name: 'Mercedes', points: 409, wins: 0, poles: 3, color: 'bg-cyan-400' },
  { position: 3, name: 'Ferrari', points: 406, wins: 2, poles: 5, color: 'bg-red-600' },
  { position: 4, name: 'McLaren', points: 302, wins: 0, poles: 2, color: 'bg-orange-500' },
  { position: 5, name: 'Aston Martin', points: 280, wins: 0, poles: 0, color: 'bg-green-600' },
  { position: 6, name: 'Alpine', points: 120, wins: 0, poles: 0, color: 'bg-pink-500' },
  { position: 7, name: 'Williams', points: 28, wins: 0, poles: 0, color: 'bg-blue-400' },
  { position: 8, name: 'Alfa Romeo', points: 16, wins: 0, poles: 0, color: 'bg-red-800' },
];

export function TeamStandings({ walletAddress }: TeamStandingsProps) {
  const totalPoints = teamData.reduce((sum, team) => sum + team.points, 0);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-800/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-2">2024 Constructor Standings</h2>
            <p className="text-gray-400">Team championship rankings</p>
          </div>
          {walletAddress && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2">
              <p className="text-blue-400 text-sm">🔗 Blockchain Verified</p>
            </div>
          )}
        </div>
      </div>

      {/* Standings Grid */}
      <div className="grid grid-cols-1 gap-4">
        {teamData.map((team) => {
          const percentage = (team.points / totalPoints) * 100;
          
          return (
            <div 
              key={team.position}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${team.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-xl">{team.position}</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-white">{team.name}</h3>
                    <p className="text-gray-400 text-sm">{team.points} points</p>
                  </div>
                </div>
                
                <div className="flex gap-6 text-center">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Wins</p>
                    <p className="text-white text-lg">{team.wins}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Poles</p>
                    <p className="text-white text-lg">{team.poles}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Share</p>
                    <p className="text-white text-lg">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full ${team.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-indigo-900/20 to-indigo-800/10 border border-indigo-800/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-indigo-400" />
            <h3 className="text-lg">Constructor Champion</h3>
          </div>
          <p className="text-2xl text-white mb-1">Red Bull Racing</p>
          <p className="text-indigo-400">860 points • 21 wins</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
            <span>🏆</span>
            <span>Dominant season performance</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border border-emerald-800/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg">Total Championships</h3>
          </div>
          <p className="text-2xl text-white mb-1">All Teams</p>
          <p className="text-emerald-400">{totalPoints.toLocaleString()} total points</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
            <span>📊</span>
            <span>Across {teamData.length} teams</span>
          </div>
        </div>
      </div>
    </div>
  );
}
