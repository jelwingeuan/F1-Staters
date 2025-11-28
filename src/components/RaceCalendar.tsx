import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';

interface RaceCalendarProps {
  walletAddress: string | null;
}

const races = [
  { round: 1, name: 'Bahrain Grand Prix', location: 'Sakhir', date: 'Mar 2', status: 'completed', winner: 'M. Verstappen' },
  { round: 2, name: 'Saudi Arabian Grand Prix', location: 'Jeddah', date: 'Mar 9', status: 'completed', winner: 'M. Verstappen' },
  { round: 3, name: 'Australian Grand Prix', location: 'Melbourne', date: 'Mar 30', status: 'completed', winner: 'M. Verstappen' },
  { round: 4, name: 'Japanese Grand Prix', location: 'Suzuka', date: 'Apr 7', status: 'completed', winner: 'M. Verstappen' },
  { round: 5, name: 'Chinese Grand Prix', location: 'Shanghai', date: 'Apr 21', status: 'completed', winner: 'M. Verstappen' },
  { round: 6, name: 'Miami Grand Prix', location: 'Miami', date: 'May 5', status: 'completed', winner: 'M. Verstappen' },
  { round: 7, name: 'Emilia Romagna Grand Prix', location: 'Imola', date: 'May 19', status: 'completed', winner: 'M. Verstappen' },
  { round: 8, name: 'Monaco Grand Prix', location: 'Monte Carlo', date: 'May 26', status: 'completed', winner: 'M. Verstappen' },
  { round: 9, name: 'Spanish Grand Prix', location: 'Barcelona', date: 'Jun 2', status: 'completed', winner: 'M. Verstappen' },
  { round: 10, name: 'Canadian Grand Prix', location: 'Montreal', date: 'Jun 16', status: 'upcoming', winner: null },
  { round: 11, name: 'Austrian Grand Prix', location: 'Spielberg', date: 'Jun 30', status: 'upcoming', winner: null },
  { round: 12, name: 'British Grand Prix', location: 'Silverstone', date: 'Jul 7', status: 'upcoming', winner: null },
];

export function RaceCalendar({ walletAddress }: RaceCalendarProps) {
  const completedRaces = races.filter(r => r.status === 'completed').length;
  const upcomingRaces = races.filter(r => r.status === 'upcoming').length;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 border border-purple-800/30 rounded-xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl mb-2">2024 Race Calendar</h2>
            <p className="text-gray-400">Complete season schedule</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2 text-center">
              <p className="text-green-400 text-sm">Completed</p>
              <p className="text-white text-xl">{completedRaces}</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2 text-center">
              <p className="text-blue-400 text-sm">Upcoming</p>
              <p className="text-white text-xl">{upcomingRaces}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {races.map((race) => (
          <div 
            key={race.round}
            className={`rounded-xl p-6 border transition-all ${
              race.status === 'completed'
                ? 'bg-gray-900/50 border-gray-800 opacity-75'
                : 'bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-800/30'
            }`}
          >
            {/* Round Number & Status */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Round {race.round}</span>
              {race.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <Clock className="w-5 h-5 text-yellow-400" />
              )}
            </div>

            {/* Race Name */}
            <h3 className="text-lg text-white mb-3">{race.name}</h3>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{race.location}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{race.date}, 2024</span>
            </div>

            {/* Winner */}
            {race.winner && (
              <div className="pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-1">Winner</p>
                <p className="text-white flex items-center gap-2">
                  <span>🏆</span>
                  <span>{race.winner}</span>
                </p>
              </div>
            )}

            {/* Upcoming Badge */}
            {race.status === 'upcoming' && (
              <div className="pt-4 border-t border-red-800/30">
                <span className="inline-flex items-center gap-1 text-xs bg-red-500/20 text-red-300 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span>Upcoming</span>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Season Progress */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">Season Progress</h3>
          <span className="text-gray-400">{completedRaces}/{races.length} races</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500"
            style={{ width: `${(completedRaces / races.length) * 100}%` }}
          />
        </div>
        <p className="text-gray-400 text-sm mt-2">
          {((completedRaces / races.length) * 100).toFixed(1)}% of season completed
        </p>
      </div>
    </div>
  );
}
