export type Position =
  | 'GK'  // Goalkeeper
  | 'LB'  // Left Back
  | 'CB'  // Center Back
  | 'RB'  // Right Back
  | 'LWB' // Left Wing Back
  | 'RWB' // Right Wing Back
  | 'DM'  // Defensive Midfielder
  | 'CM'  // Central Midfielder
  | 'LM'  // Left Midfielder
  | 'RM'  // Right Midfielder
  | 'AM'  // Attacking Midfielder
  | 'LW'  // Left Winger
  | 'RW'  // Right Winger
  | 'ST'  // Striker
  | 'CF'; // Center Forward

export type Foot = 'Left' | 'Right' | 'Both';

export interface PlayerAttributes {
  // Technical
  corners: number;
  crossing: number;
  dribbling: number;
  finishing: number;
  firstTouch: number;
  freeKicks: number;
  heading: number;
  longShots: number;
  longThrows: number;
  marking: number;
  passing: number;
  penaltyTaking: number;
  tackling: number;
  technique: number;

  // Mental
  aggression: number;
  anticipation: number;
  bravery: number;
  composure: number;
  concentration: number;
  decisions: number;
  determination: number;
  flair: number;
  leadership: number;
  offTheBall: number;
  positioning: number;
  teamwork: number;
  vision: number;
  workRate: number;

  // Physical
  acceleration: number;
  agility: number;
  balance: number;
  jumping: number;
  naturalFitness: number;
  pace: number;
  stamina: number;
  strength: number;
}

export interface Player {
  id: string;
  name: string;
  age: number;
  nationality: string;
  position: Position;
  secondaryPositions?: Position[];
  preferredFoot: Foot;
  height: number; // in cm
  weight: number; // in kg
  shirtNumber?: number;
  value: number; // in millions
  wage: number; // per week in thousands
  contractExpiry?: string; // YYYY-MM-DD
  attributes: PlayerAttributes;
  potential?: number; // 1-200
  currentAbility?: number; // 1-200
  morale?: 'Very Happy' | 'Happy' | 'Content' | 'Unhappy' | 'Very Unhappy';
  fitness?: number; // 0-100
  condition?: number; // 0-100
  injuryStatus?: string;
  notes?: string;
  dateAdded?: string;
}

export interface PlayerFormData extends Omit<Player, 'id' | 'dateAdded'> {}
