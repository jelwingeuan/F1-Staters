import { Card, CardContent } from "./ui/card";
import { Trophy, Flag, Users, Calendar } from "lucide-react";

export function StatsOverview() {
  const stats = [
    {
      icon: Trophy,
      label: "Championship Leader",
      value: "Max Verstappen",
      subValue: "347 points"
    },
    {
      icon: Users,
      label: "Leading Team",
      value: "Red Bull Racing",
      subValue: "598 points"
    },
    {
      icon: Flag,
      label: "Races Completed",
      value: "18 / 24",
      subValue: "6 races remaining"
    },
    {
      icon: Calendar,
      label: "Next Race",
      value: "Las Vegas GP",
      subValue: "Nov 23, 2025"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-black/40 border-red-900/30 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-600/20 rounded-lg">
                <stat.icon className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="text-white mt-1">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.subValue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
