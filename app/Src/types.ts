export enum AppMode {
  CONNECTING = 'CONNECTING',
  MOUSE = 'MOUSE',
  KEYBOARD = 'KEYBOARD'
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
