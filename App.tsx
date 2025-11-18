import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { DriverStandings } from "./components/DriverStandings";
import { ConstructorStandings } from "./components/ConstructorStandings";
import { RecentRaces } from "./components/RecentRaces";
import { StatsOverview } from "./components/StatsOverview";
import { Trophy, Flame } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-red-900/30 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Flame className="w-10 h-10 text-red-600" />
            <div>
              <h1 className="text-red-600 tracking-wider">F1 Staters</h1>
              <p className="text-slate-400 text-sm">2025 Season</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <StatsOverview />

        <Tabs defaultValue="drivers" className="mt-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-black/40 border border-red-900/30">
            <TabsTrigger value="drivers" className="data-[state=active]:bg-red-600">
              Drivers
            </TabsTrigger>
            <TabsTrigger value="constructors" className="data-[state=active]:bg-red-600">
              Constructors
            </TabsTrigger>
            <TabsTrigger value="races" className="data-[state=active]:bg-red-600">
              Races
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drivers" className="mt-6">
            <DriverStandings />
          </TabsContent>

          <TabsContent value="constructors" className="mt-6">
            <ConstructorStandings />
          </TabsContent>

          <TabsContent value="races" className="mt-6">
            <RecentRaces />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-red-900/30 bg-black/40 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-slate-400 text-sm">
            F1 Stats Dashboard • 2025 Season • Mock Data for Demo
          </p>
        </div>
      </footer>
    </div>
  );
}