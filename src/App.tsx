import { useState } from 'react';
import { F1StatsProvider } from './context/F1StatsContext';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { DriverAnalytics } from './components/DriverAnalytics';
import { TeamAnalytics } from './components/TeamAnalytics';
import { RaceAnalysis } from './components/RaceAnalysis';
import { Comparison } from './components/Comparison';
import { LiveTelemetry } from './components/LiveTelemetry';

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'drivers' | 'teams' | 'races' | 'comparison' | 'telemetry'>('dashboard');

  return (
    <F1StatsProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        <Header activeView={activeView} setActiveView={setActiveView} />
        
        <main className="relative">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'drivers' && <DriverAnalytics />}
          {activeView === 'teams' && <TeamAnalytics />}
          {activeView === 'races' && <RaceAnalysis />}
          {activeView === 'comparison' && <Comparison />}
          {activeView === 'telemetry' && <LiveTelemetry />}
        </main>

        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>
    </F1StatsProvider>
  );
}
