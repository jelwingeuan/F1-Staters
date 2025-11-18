import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Flag, MapPin, Calendar } from "lucide-react";

const races = [
  {
    round: 18,
    name: "São Paulo Grand Prix",
    location: "Interlagos, Brazil",
    date: "Nov 3, 2025",
    winner: "Max Verstappen",
    team: "Red Bull Racing",
    fastestLap: "1:10.234",
    status: "completed"
  },
  {
    round: 17,
    name: "Mexico City Grand Prix",
    location: "Mexico City, Mexico",
    date: "Oct 27, 2025",
    winner: "Carlos Sainz",
    team: "Ferrari",
    fastestLap: "1:17.512",
    status: "completed"
  },
  {
    round: 16,
    name: "United States Grand Prix",
    location: "Austin, Texas",
    date: "Oct 20, 2025",
    winner: "Lando Norris",
    team: "McLaren",
    fastestLap: "1:36.213",
    status: "completed"
  },
  {
    round: 19,
    name: "Las Vegas Grand Prix",
    location: "Las Vegas, Nevada",
    date: "Nov 23, 2025",
    winner: "TBD",
    team: "TBD",
    fastestLap: "-",
    status: "upcoming"
  },
  {
    round: 20,
    name: "Qatar Grand Prix",
    location: "Lusail, Qatar",
    date: "Dec 1, 2025",
    winner: "TBD",
    team: "TBD",
    fastestLap: "-",
    status: "upcoming"
  },
];

export function RecentRaces() {
  return (
    <div className="space-y-4">
      {races.map((race) => (
        <Card
          key={race.round}
          className={`bg-black/40 border-red-900/30 backdrop-blur-sm ${
            race.status === "upcoming" ? "border-yellow-600/30" : ""
          }`}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className={`${
                      race.status === "upcoming"
                        ? "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    Round {race.round}
                  </Badge>
                  {race.status === "upcoming" && (
                    <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                      Upcoming
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Flag className="w-5 h-5 text-red-600" />
                  {race.name}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{race.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>{race.date}</span>
                </div>
              </div>

              {race.status === "completed" && (
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800/50">
                  <p className="text-sm text-slate-400 mb-2">Race Winner</p>
                  <p className="text-white">{race.winner}</p>
                  <p className="text-sm text-slate-400">{race.team}</p>
                  <div className="mt-2 pt-2 border-t border-slate-800/50">
                    <p className="text-xs text-slate-500">Fastest Lap: {race.fastestLap}</p>
                  </div>
                </div>
              )}

              {race.status === "upcoming" && (
                <div className="bg-yellow-600/10 rounded-lg p-3 border border-yellow-600/30">
                  <p className="text-sm text-yellow-400">Race not yet completed</p>
                  <p className="text-xs text-slate-400 mt-1">Check back after {race.date}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
