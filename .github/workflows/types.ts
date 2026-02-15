export enum AppMode {
  CONNECTING = 'CONNECTING',
  MOUSE = 'MOUSE',
  KEYBOARD = 'KEYBOARD',
  AI_ASSIST = 'AI_ASSIST'
}

export interface Device {
  id: string;
  name: string;
  type: 'desktop' | 'tablet' | 'mobile';
  connected: boolean;
}

export interface TouchPoint {
  x: number;
  y: number;
}
