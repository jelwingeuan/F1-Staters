import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Gauge, Thermometer, Wind, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export function LiveTelemetry() {
  const [telemetryData, setTelemetryData] = useState<any[]>([]);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [currentRPM, setCurrentRPM] = useState(0);
  const [currentGear, setCurrentGear] = useState(3);
  const [temperature, setTemperature] = useState({ engine: 85, brakes: 450, tires: 95 });

  useEffect(() => {
    // Simulate real-time telemetry data
    const interval = setInterval(() => {
      const newSpeed = 150 + Math.random() * 180;
      const newRPM = 8000 + Math.random() * 4000;
      const newGear = Math.floor(newSpeed / 60);

      setCurrentSpeed(newSpeed);
      setCurrentRPM(newRPM);
      setCurrentGear(Math.min(8, Math.max(1, newGear)));

      setTemperature({
        engine: 85 + Math.random() * 20,
        brakes: 450 + Math.random() * 150,
        tires: 95 + Math.random() * 15,
      });

      setTelemetryData(prev => {
        const newData = [
          ...prev,
          {
            time: Date.now(),
            speed: newSpeed,
            rpm: newRPM,
            throttle: 60 + Math.random() * 40,
            brake: Math.random() * 100,
          }
        ].slice(-30);
        return newData;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const normalizedData = telemetryData.map((d, i) => ({
    time: i,
    speed: d.speed,
    rpm: d.rpm / 100,
    throttle: d.throttle,
    brake: d.brake,
  }));

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl">Live Telemetry</h1>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-lg animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-sm text-white">LIVE</span>
          </div>
        </div>
        <p className="text-gray-400">Real-time car performance data</p>
      </motion.div>

      {/* Main Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <Gauge className="w-6 h-6 text-red-500" />
              <span className="text-sm text-gray-400">km/h</span>
            </div>
            <div className="text-center">
              <motion.div
                key={Math.floor(currentSpeed)}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="text-6xl mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
              >
                {Math.floor(currentSpeed)}
              </motion.div>
              <p className="text-sm text-gray-400">Speed</p>
              <div className="mt-4 w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-orange-600"
                  animate={{ width: `${(currentSpeed / 330) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-6 h-6 text-purple-500" />
              <span className="text-sm text-gray-400">RPM</span>
            </div>
            <div className="text-center">
              <motion.div
                key={Math.floor(currentRPM)}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="text-6xl mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                {Math.floor(currentRPM)}
              </motion.div>
              <p className="text-sm text-gray-400">Engine RPM</p>
              <div className="mt-4 w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  animate={{ width: `${(currentRPM / 15000) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">⚙️</span>
              <span className="text-sm text-gray-400">Gear</span>
            </div>
            <div className="text-center">
              <motion.div
                key={currentGear}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="text-6xl mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
              >
                {currentGear}
              </motion.div>
              <p className="text-sm text-gray-400">Current Gear</p>
              <div className="mt-4 flex justify-center gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(gear => (
                  <div
                    key={gear}
                    className={`w-8 h-2 rounded-full transition-all ${
                      gear <= currentGear ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gray-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl blur-xl" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg mb-4">Speed & RPM</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={normalizedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="time" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line type="monotone" dataKey="speed" stroke="#ef4444" strokeWidth={2} dot={false} name="Speed" />
                <Line type="monotone" dataKey="rpm" stroke="#a855f7" strokeWidth={2} dot={false} name="RPM/100" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-2xl blur-xl" />
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg mb-4">Throttle & Brake</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={normalizedData}>
                <defs>
                  <linearGradient id="throttle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="brake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="time" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area type="monotone" dataKey="throttle" stroke="#10b981" fillOpacity={1} fill="url(#throttle)" strokeWidth={2} name="Throttle" />
                <Area type="monotone" dataKey="brake" stroke="#ef4444" fillOpacity={1} fill="url(#brake)" strokeWidth={2} name="Brake" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Temperature Monitors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-400">Engine Temp</span>
            </div>
            <span className="text-2xl text-orange-500">{Math.floor(temperature.engine)}°C</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-600 to-orange-600"
              animate={{ width: `${(temperature.engine / 120) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-400">Brake Temp</span>
            </div>
            <span className="text-2xl text-red-500">{Math.floor(temperature.brakes)}°C</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-600 to-red-600"
              animate={{ width: `${(temperature.brakes / 700) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏁</span>
              <span className="text-sm text-gray-400">Tire Temp</span>
            </div>
            <span className="text-2xl text-blue-500">{Math.floor(temperature.tires)}°C</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-600"
              animate={{ width: `${(temperature.tires / 120) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
