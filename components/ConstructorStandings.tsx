import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Building2, Crown } from "lucide-react";

const constructors = [
  { position: 1, name: "Red Bull Racing", points: 598, color: "bg-blue-600" },
  { position: 2, name: "McLaren", points: 588, color: "bg-orange-600" },
  { position: 3, name: "Ferrari", points: 562, color: "bg-red-700" },
  { position: 4, name: "Mercedes", points: 434, color: "bg-cyan-600" },
  { position: 5, name: "Aston Martin", points: 301, color: "bg-green-700" },
  { position: 6, name: "Alpine", points: 156, color: "bg-pink-600" },
  { position: 7, name: "Williams", points: 134, color: "bg-blue-400" },
  { position: 8, name: "RB", points: 112, color: "bg-slate-600" },
  { position: 9, name: "Kick Sauber", points: 45, color: "bg-emerald-600" },
  { position: 10, name: "Haas F1 Team", points: 38, color: "bg-slate-500" },
];

export function ConstructorStandings() {
  return (
    <Card className="bg-black/40 border-red-900/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Building2 className="w-5 h-5 text-red-600" />
          Constructor Standings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {constructors.map((constructor) => (
            <div
              key={constructor.position}
              className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800/50 hover:border-red-900/50 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-red-600/20 rounded-lg">
                <span className="text-red-600">{constructor.position}</span>
              </div>

              <div className={`w-1 h-12 rounded ${constructor.color}`} />
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-white">{constructor.name}</p>
                  {constructor.position === 1 && (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <p className="text-sm text-slate-400">Position {constructor.position}</p>
              </div>

              <div className="text-right">
                <p className="text-white">{constructor.points} pts</p>
                {constructor.position <= 3 && (
                  <Badge variant="secondary" className="bg-red-600/20 text-red-400 text-xs border-red-600/30 mt-1">
                    Top 3
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
