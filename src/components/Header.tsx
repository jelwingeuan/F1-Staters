import { Search, BarChart3, TrendingUp, Users, Flag, GitCompare, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: 'dashboard' | 'drivers' | 'teams' | 'races' | 'comparison' | 'telemetry') => void;
}

export function Header({ activeView, setActiveView }: HeaderProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'teams', label: 'Teams', icon: TrendingUp },
    { id: 'races', label: 'Races', icon: Flag },
    { id: 'comparison', label: 'Compare', icon: GitCompare },
    { id: 'telemetry', label: 'Telemetry', icon: Activity },
  ] as const;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4 border-b border-white/5">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl blur-lg opacity-50" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-red-600 via-red-700 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏎️</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                F1 Analytics Pro
              </h1>
              <p className="text-xs text-gray-500">Advanced Performance Intelligence</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search drivers, teams..."
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all w-64"
              />
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-600/20 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-red-400">Live Season</span>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2 py-2 overflow-x-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveView(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-600/30 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
