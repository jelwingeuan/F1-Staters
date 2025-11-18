import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

const drivers = [
  { position: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 347, wins: 10, trend: "up" },
  { position: 2, name: "Lando Norris", team: "McLaren", points: 312, wins: 5, trend: "up" },
  { position: 3, name: "Charles Leclerc", team: "Ferrari", points: 298, wins: 4, trend: "down" },
  { position: 4, name: "Oscar Piastri", team: "McLaren", points: 276, wins: 2, trend: "up" },
  { position: 5, name: "Carlos Sainz", team: "Ferrari", points: 264, wins: 3, trend: "same" },
  { position: 6, name: "George Russell", team: "Mercedes", points: 223, wins: 2, trend: "up" },
  { position: 7, name: "Lewis Hamilton", team: "Mercedes", points: 211, wins: 1, trend: "down" },
  { position: 8, name: "Sergio Perez", team: "Red Bull Racing", points: 189, wins: 0, trend: "down" },
  { position: 9, name: "Fernando Alonso", team: "Aston Martin", points: 167, wins: 0, trend: "same" },
  { position: 10, name: "Lance Stroll", team: "Aston Martin", points: 134, wins: 0, trend: "up" },
];

export function DriverStandings() {
  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-slate-500" />;
  };

  return (
    <Card className="bg-black/40 border-red-900/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Trophy className="w-5 h-5 text-red-600" />
          Driver Standings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {drivers.map((driver) => (
            <div
              key={driver.position}
              className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800/50 hover:border-red-900/50 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-red-600/20 rounded-lg">
                <span className="text-red-600">{driver.position}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-white">{driver.name}</p>
                  {driver.position <= 3 && (
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <p className="text-sm text-slate-400">{driver.team}</p>
              </div>

              <div className="text-right">
                <p className="text-white">{driver.points} pts</p>
                <div className="flex items-center gap-1 text-sm text-slate-400 justify-end mt-1">
                  <Badge variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                    {driver.wins} wins
                  </Badge>
                  {getTrendIcon(driver.trend)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
