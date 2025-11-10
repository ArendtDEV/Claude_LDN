import type { Player, PlayerFormData } from '../types/Player';

const STORAGE_KEY = 'xita_ldn_players';

// Sample data for initial setup
const getSamplePlayers = (): Player[] => [
  {
    id: '1',
    name: 'Kim Min-jae',
    age: 27,
    nationality: 'South Korea',
    position: 'CB',
    preferredFoot: 'Right',
    height: 190,
    weight: 85,
    shirtNumber: 4,
    value: 45.0,
    wage: 80,
    contractExpiry: '2027-06-30',
    currentAbility: 165,
    potential: 170,
    morale: 'Happy',
    fitness: 95,
    condition: 90,
    attributes: {
      corners: 5,
      crossing: 8,
      dribbling: 12,
      finishing: 6,
      firstTouch: 14,
      freeKicks: 7,
      heading: 16,
      longShots: 9,
      longThrows: 10,
      marking: 17,
      passing: 13,
      penaltyTaking: 8,
      tackling: 17,
      technique: 13,
      aggression: 14,
      anticipation: 17,
      bravery: 18,
      composure: 16,
      concentration: 16,
      decisions: 15,
      determination: 17,
      flair: 10,
      leadership: 14,
      offTheBall: 11,
      positioning: 17,
      teamwork: 15,
      vision: 12,
      workRate: 15,
      acceleration: 14,
      agility: 13,
      balance: 14,
      jumping: 17,
      naturalFitness: 16,
      pace: 14,
      stamina: 15,
      strength: 17,
    },
    dateAdded: new Date().toISOString(),
  },
];

export const playerService = {
  // Get all players
  getAllPlayers(): Player[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const samplePlayers = getSamplePlayers();
      this.saveAllPlayers(samplePlayers);
      return samplePlayers;
    }
    return JSON.parse(stored);
  },

  // Get player by ID
  getPlayerById(id: string): Player | undefined {
    const players = this.getAllPlayers();
    return players.find((p) => p.id === id);
  },

  // Add new player
  addPlayer(playerData: PlayerFormData): Player {
    const players = this.getAllPlayers();
    const newPlayer: Player = {
      ...playerData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    };
    players.push(newPlayer);
    this.saveAllPlayers(players);
    return newPlayer;
  },

  // Update player
  updatePlayer(id: string, playerData: Partial<PlayerFormData>): Player | null {
    const players = this.getAllPlayers();
    const index = players.findIndex((p) => p.id === id);
    if (index === -1) return null;

    players[index] = { ...players[index], ...playerData };
    this.saveAllPlayers(players);
    return players[index];
  },

  // Delete player
  deletePlayer(id: string): boolean {
    const players = this.getAllPlayers();
    const filtered = players.filter((p) => p.id !== id);
    if (filtered.length === players.length) return false;
    this.saveAllPlayers(filtered);
    return true;
  },

  // Save all players to storage
  saveAllPlayers(players: Player[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  },

  // Search and filter
  searchPlayers(query: string): Player[] {
    const players = this.getAllPlayers();
    const lowerQuery = query.toLowerCase();
    return players.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.position.toLowerCase().includes(lowerQuery) ||
        p.nationality.toLowerCase().includes(lowerQuery)
    );
  },

  // Filter by position
  filterByPosition(position: string): Player[] {
    const players = this.getAllPlayers();
    if (!position) return players;
    return players.filter((p) => p.position === position);
  },

  // Get statistics
  getStatistics() {
    const players = this.getAllPlayers();
    return {
      totalPlayers: players.length,
      averageAge: players.reduce((sum, p) => sum + p.age, 0) / players.length || 0,
      totalValue: players.reduce((sum, p) => sum + p.value, 0),
      averageCurrentAbility:
        players.reduce((sum, p) => sum + (p.currentAbility || 0), 0) / players.length || 0,
      positionBreakdown: players.reduce(
        (acc, p) => {
          acc[p.position] = (acc[p.position] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
    };
  },

  // Export data
  exportData(): string {
    const players = this.getAllPlayers();
    return JSON.stringify(players, null, 2);
  },

  // Import data
  importData(jsonData: string): boolean {
    try {
      const players = JSON.parse(jsonData) as Player[];
      this.saveAllPlayers(players);
      return true;
    } catch {
      return false;
    }
  },
};
