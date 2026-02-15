import { registerPlugin, PluginListenerHandle } from '@capacitor/core';

interface UniControlPlugin {
  startBluetooth(): Promise<{ success: boolean }>;
  sendMouse(options: { dx: number; dy: number; buttons: number }): Promise<void>;
  sendKeyboard(options: { key: string }): Promise<void>;
  sendScroll(options: { dy: number }): Promise<void>;
  addListener(eventName: 'connectionChange', listenerFunc: (state: { connected: boolean; name?: string }) => void): Promise<PluginListenerHandle>;
}

const UniControl = registerPlugin<UniControlPlugin>('UniControl');

class NativeBridgeService {
  constructor() { this.init(); }
  async init() { try { await UniControl.startBluetooth(); } catch (e) { console.error("Init Failed", e); } }
  async broadcastSignal() { await UniControl.startBluetooth(); }
  onConnectionChange(callback: (connected: boolean, name?: string) => void) {
    return UniControl.addListener('connectionChange', (state) => callback(state.connected, state.name));
  }
  async sendHidCommand(command: { type: string; data: any }) {
    try {
      switch (command.type) {
        case 'MOUSE_MOVE': await UniControl.sendMouse({ dx: Math.round(command.data.dx), dy: Math.round(command.data.dy), buttons: 0 }); break;
        case 'MOUSE_CLICK': 
          const btn = command.data.type === 'left' ? 1 : 2;
          await UniControl.sendMouse({ dx: 0, dy: 0, buttons: btn });
          await UniControl.sendMouse({ dx: 0, dy: 0, buttons: 0 });
          break;
        case 'SCROLL': await UniControl.sendScroll({ dy: command.data.dy }); break;
        case 'KEY_PRESS': await UniControl.sendKeyboard({ key: command.data.key || command.data.text }); break;
      }
    } catch (e) {}
  }
}
export const nativeBridge = new NativeBridgeService();
