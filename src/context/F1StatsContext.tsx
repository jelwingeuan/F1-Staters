import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Driver {
  id: number;
  name: string;
  team: string;
  number: number;
  nationality: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  dnfs: number;
  avgPosition: number;
  pointsPerRace: number;
  consistency: number;
  performance: number[];
}

interface Team {
  id: number;
  name: string;
  points: number;
  wins: number;
  poles: number;
  podiums: number;
  reliability: number;
  avgPitStop: number;
  performance: number[];
}

interface Race {
  id: number;
  name: string;
  circuit: string;
  date: string;
  laps: number;
  distance: number;
  winner: string;
  fastestLap: string;
  avgSpeed: number;
  completed: boolean;
}

interface F1StatsContextType {
  drivers: Driver[];
  teams: Team[];
  races: Race[];
  selectedDriver: Driver | null;
  selectedTeam: Team | null;
  setSelectedDriver: (driver: Driver | null) => void;
  setSelectedTeam: (team: Team | null) => void;
  filterDrivers: (search: string) => Driver[];
  filterTeams: (search: string) => Team[];
}

const F1StatsContext = createContext<F1StatsContextType | undefined>(undefined);

export function F1StatsProvider({ children }: { children: ReactNode }) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    // Initialize mock data with 2025 Season (10 races completed)
    setDrivers([
      {
        id: 1, name: 'Lando Norris', team: 'McLaren', number: 4, nationality: '🇬🇧',
        points: 215, wins: 4, podiums: 8, poles: 3, fastestLaps: 3, dnfs: 0,
        avgPosition: 2.1, pointsPerRace: 21.5, consistency: 96,
        performance: [25, 18, 25, 18, 25, 15, 18, 25, 18, 18]
      },
      {
        id: 2, name: 'Max Verstappen', team: 'Red Bull Racing', number: 1, nationality: '🇳🇱',
        points: 198, wins: 3, podiums: 7, poles: 5, fastestLaps: 4, dnfs: 1,
        avgPosition: 2.3, pointsPerRace: 19.8, consistency: 94,
        performance: [18, 25, 18, 25, 18, 25, 0, 18, 25, 18]
      },
      {
        id: 3, name: 'Charles Leclerc', team: 'Ferrari', number: 16, nationality: '🇲🇨',
        points: 186, wins: 2, podiums: 7, poles: 2, fastestLaps: 2, dnfs: 0,
        avgPosition: 2.8, pointsPerRace: 18.6, consistency: 92,
        performance: [15, 15, 15, 18, 15, 18, 25, 15, 25, 15]
      },
      {
        id: 4, name: 'Oscar Piastri', team: 'McLaren', number: 81, nationality: '🇦🇺',
        points: 172, wins: 1, podiums: 6, poles: 0, fastestLaps: 1, dnfs: 1,
        avgPosition: 3.2, pointsPerRace: 17.2, consistency: 88,
        performance: [12, 12, 12, 15, 12, 18, 25, 12, 15, 0]
      },
      {
        id: 5, name: 'Lewis Hamilton', team: 'Ferrari', number: 44, nationality: '🇬🇧',
        points: 154, wins: 0, podiums: 6, poles: 1, fastestLaps: 2, dnfs: 0,
        avgPosition: 3.8, pointsPerRace: 15.4, consistency: 85,
        performance: [10, 18, 10, 12, 18, 12, 15, 18, 15, 12]
      },
      {
        id: 6, name: 'George Russell', team: 'Mercedes', number: 63, nationality: '🇬🇧',
        points: 128, wins: 0, podiums: 4, poles: 1, fastestLaps: 1, dnfs: 0,
        avgPosition: 5.1, pointsPerRace: 12.8, consistency: 82,
        performance: [8, 10, 8, 10, 10, 15, 12, 18, 12, 10]
      },
      {
        id: 7, name: 'Carlos Sainz', team: 'Williams', number: 55, nationality: '🇪🇸',
        points: 98, wins: 0, podiums: 2, poles: 0, fastestLaps: 0, dnfs: 1,
        avgPosition: 6.8, pointsPerRace: 9.8, consistency: 75,
        performance: [6, 8, 18, 8, 8, 10, 10, 8, 12, 0]
      },
      {
        id: 8, name: 'Fernando Alonso', team: 'Aston Martin', number: 14, nationality: '🇪🇸',
        points: 76, wins: 0, podiums: 1, poles: 0, fastestLaps: 0, dnfs: 1,
        avgPosition: 8.2, pointsPerRace: 7.6, consistency: 72,
        performance: [4, 6, 6, 6, 0, 8, 8, 15, 10, 6]
      },
      {
        id: 9, name: 'Liam Lawson', team: 'Red Bull Racing', number: 40, nationality: '🇳🇿',
        points: 68, wins: 0, podiums: 1, poles: 0, fastestLaps: 0, dnfs: 2,
        avgPosition: 8.9, pointsPerRace: 6.8, consistency: 65,
        performance: [0, 4, 6, 8, 6, 6, 18, 10, 0, 8]
      },
      {
        id: 10, name: 'Pierre Gasly', team: 'Alpine', number: 10, nationality: '🇫🇷',
        points: 54, wins: 0, podiums: 0, poles: 0, fastestLaps: 1, dnfs: 1,
        avgPosition: 10.5, pointsPerRace: 5.4, consistency: 68,
        performance: [2, 2, 4, 4, 8, 4, 6, 8, 6, 0]
      },
      {
        id: 11, name: 'Alex Albon', team: 'Williams', number: 23, nationality: '🇹🇭',
        points: 42, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dnfs: 2,
        avgPosition: 11.8, pointsPerRace: 4.2, consistency: 62,
        performance: [1, 2, 2, 4, 6, 0, 4, 8, 6, 0]
      },
      {
        id: 12, name: 'Lance Stroll', team: 'Aston Martin', number: 18, nationality: '🇨🇦',
        points: 38, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dnfs: 2,
        avgPosition: 12.2, pointsPerRace: 3.8, consistency: 58,
        performance: [2, 1, 4, 2, 4, 2, 6, 4, 0, 0]
      },
      {
        id: 13, name: 'Esteban Ocon', team: 'Haas', number: 31, nationality: '🇫🇷',
        points: 28, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dnfs: 1,
        avgPosition: 13.5, pointsPerRace: 2.8, consistency: 55,
        performance: [0, 2, 2, 1, 2, 4, 2, 4, 2, 1]
      },
      {
        id: 14, name: 'Yuki Tsunoda', team: 'RB', number: 22, nationality: '🇯🇵',
        points: 22, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dnfs: 2,
        avgPosition: 14.2, pointsPerRace: 2.2, consistency: 52,
        performance: [1, 1, 1, 2, 1, 2, 0, 4, 2, 0]
      },
      {
        id: 15, name: 'Kimi Antonelli', team: 'Mercedes', number: 12, nationality: '🇮🇹',
        points: 18, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dnfs: 1,
        avgPosition: 14.8, pointsPerRace: 1.8, consistency: 48,
        performance: [2, 1, 0, 1, 2, 1, 2, 2, 1, 0]
      },
    ]);

    setTeams([
      {
        id: 1, name: 'McLaren', points: 387, wins: 5, poles: 3, podiums: 14,
        reliability: 96, avgPitStop: 2.1,
        performance: [37, 30, 37, 33, 37, 33, 43, 37, 33, 18]
      },
      {
        id: 2, name: 'Red Bull Racing', points: 266, wins: 3, poles: 5, podiums: 8,
        reliability: 89, avgPitStop: 2.0,
        performance: [18, 29, 24, 33, 24, 31, 18, 28, 25, 26]
      },
      {
        id: 3, name: 'Ferrari', points: 340, wins: 2, poles: 3, podiums: 13,
        reliability: 94, avgPitStop: 2.2,
        performance: [25, 33, 25, 30, 33, 30, 40, 33, 40, 27]
      },
      {
        id: 4, name: 'Mercedes', points: 146, wins: 0, poles: 2, podiums: 4,
        reliability: 92, avgPitStop: 2.3,
        performance: [10, 11, 8, 11, 12, 16, 14, 20, 13, 10]
      },
      {
        id: 5, name: 'Williams', points: 140, wins: 0, poles: 0, podiums: 2,
        reliability: 88, avgPitStop: 2.5,
        performance: [7, 10, 20, 12, 14, 10, 14, 16, 18, 0]
      },
      {
        id: 6, name: 'Aston Martin', points: 114, wins: 0, poles: 0, podiums: 1,
        reliability: 85, avgPitStop: 2.4,
        performance: [6, 7, 10, 8, 4, 10, 14, 19, 10, 6]
      },
      {
        id: 7, name: 'Alpine', points: 68, wins: 0, poles: 0, podiums: 0,
        reliability: 83, avgPitStop: 2.6,
        performance: [3, 3, 5, 5, 9, 5, 7, 9, 7, 1]
      },
      {
        id: 8, name: 'Haas', points: 42, wins: 0, poles: 0, podiums: 0,
        reliability: 81, avgPitStop: 2.7,
        performance: [1, 3, 3, 2, 3, 5, 3, 5, 3, 2]
      },
    ]);

    setRaces([
      { id: 1, name: 'Australian GP', circuit: 'Albert Park Circuit', date: 'Mar 16', laps: 58, distance: 306.124, winner: 'L. Norris', fastestLap: 'M. Verstappen', avgSpeed: 229.4, completed: true },
      { id: 2, name: 'Chinese GP', circuit: 'Shanghai International Circuit', date: 'Mar 23', laps: 56, distance: 305.066, winner: 'M. Verstappen', fastestLap: 'C. Leclerc', avgSpeed: 202.1, completed: true },
      { id: 3, name: 'Japanese GP', circuit: 'Suzuka Circuit', date: 'Apr 6', laps: 53, distance: 307.471, winner: 'L. Norris', fastestLap: 'M. Verstappen', avgSpeed: 213.5, completed: true },
      { id: 4, name: 'Bahrain GP', circuit: 'Bahrain International Circuit', date: 'Apr 13', laps: 57, distance: 308.238, winner: 'M. Verstappen', fastestLap: 'L. Hamilton', avgSpeed: 196.2, completed: true },
      { id: 5, name: 'Saudi Arabian GP', circuit: 'Jeddah Corniche Circuit', date: 'Apr 20', laps: 50, distance: 308.450, winner: 'L. Norris', fastestLap: 'M. Verstappen', avgSpeed: 252.4, completed: true },
      { id: 6, name: 'Miami GP', circuit: 'Miami International Autodrome', date: 'May 4', laps: 57, distance: 308.326, winner: 'M. Verstappen', fastestLap: 'L. Norris', avgSpeed: 190.3, completed: true },
      { id: 7, name: 'Emilia Romagna GP', circuit: 'Autodromo Enzo e Dino Ferrari', date: 'May 18', laps: 63, distance: 309.049, winner: 'C. Leclerc', fastestLap: 'O. Piastri', avgSpeed: 199.1, completed: true },
      { id: 8, name: 'Monaco GP', circuit: 'Circuit de Monaco', date: 'May 25', laps: 78, distance: 260.286, winner: 'L. Norris', fastestLap: 'G. Russell', avgSpeed: 157.2, completed: true },
      { id: 9, name: 'Spanish GP', circuit: 'Circuit de Barcelona-Catalunya', date: 'Jun 1', laps: 66, distance: 307.236, winner: 'M. Verstappen', fastestLap: 'L. Hamilton', avgSpeed: 199.3, completed: true },
      { id: 10, name: 'Canadian GP', circuit: 'Circuit Gilles Villeneuve', date: 'Jun 15', laps: 70, distance: 305.270, winner: 'C. Leclerc', fastestLap: 'P. Gasly', avgSpeed: 206.1, completed: true },
      { id: 11, name: 'Austrian GP', circuit: 'Red Bull Ring', date: 'Jun 29', laps: 71, distance: 306.452, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 12, name: 'British GP', circuit: 'Silverstone Circuit', date: 'Jul 6', laps: 52, distance: 306.198, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 13, name: 'Belgian GP', circuit: 'Circuit de Spa-Francorchamps', date: 'Jul 27', laps: 44, distance: 308.052, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 14, name: 'Hungarian GP', circuit: 'Hungaroring', date: 'Aug 3', laps: 70, distance: 306.630, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 15, name: 'Dutch GP', circuit: 'Circuit Zandvoort', date: 'Aug 31', laps: 72, distance: 306.587, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 16, name: 'Italian GP', circuit: 'Autodromo Nazionale di Monza', date: 'Sep 7', laps: 53, distance: 306.720, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 17, name: 'Azerbaijan GP', circuit: 'Baku City Circuit', date: 'Sep 21', laps: 51, distance: 306.049, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 18, name: 'Singapore GP', circuit: 'Marina Bay Street Circuit', date: 'Oct 5', laps: 62, distance: 306.143, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 19, name: 'United States GP', circuit: 'Circuit of the Americas', date: 'Oct 19', laps: 56, distance: 308.405, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 20, name: 'Mexico City GP', circuit: 'Autódromo Hermanos Rodríguez', date: 'Oct 26', laps: 71, distance: 305.354, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 21, name: 'São Paulo GP', circuit: 'Autódromo José Carlos Pace', date: 'Nov 9', laps: 71, distance: 305.879, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 22, name: 'Las Vegas GP', circuit: 'Las Vegas Street Circuit', date: 'Nov 22', laps: 50, distance: 309.958, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 23, name: 'Qatar GP', circuit: 'Lusail International Circuit', date: 'Nov 30', laps: 57, distance: 308.611, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
      { id: 24, name: 'Abu Dhabi GP', circuit: 'Yas Marina Circuit', date: 'Dec 7', laps: 58, distance: 306.183, winner: '', fastestLap: '', avgSpeed: 0, completed: false },
    ]);
  }, []);

  const filterDrivers = (search: string) => {
    return drivers.filter(d => 
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.team.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filterTeams = (search: string) => {
    return teams.filter(t => 
      t.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <F1StatsContext.Provider value={{
      drivers,
      teams,
      races,
      selectedDriver,
      selectedTeam,
      setSelectedDriver,
      setSelectedTeam,
      filterDrivers,
      filterTeams,
    }}>
      {children}
    </F1StatsContext.Provider>
  );
}

export function useF1Stats() {
  const context = useContext(F1StatsContext);
  if (!context) {
    throw new Error('useF1Stats must be used within F1StatsProvider');
  }
  return context;
}