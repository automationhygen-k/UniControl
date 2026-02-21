import { registerPlugin, PluginListenerHandle, Capacitor } from '@capacitor/core';

interface UniControlPlugin {
  startBluetooth(): Promise<{ success: boolean }>;
  sendMouse(options: { dx: number; dy: number; buttons: number }): Promise<void>;
  sendKeyboard(options: { key: string }): Promise<void>;
  sendScroll(options: { dy: number }): Promise<void>;
  addListener(eventName: 'connectionChange', listenerFunc: (state: { connected: boolean; name?: string }) => void): Promise<PluginListenerHandle>;
}

const UniControl = registerPlugin<UniControlPlugin>('UniControl');

class NativeBridgeService {
  async broadcastSignal(): Promise<void> {
    try {
      if (Capacitor.isNativePlatform()) {
        await UniControl.startBluetooth();
      }
    } catch (e) { console.error("Broadcast failed", e); }
  }

  onConnectionChange(callback: (connected: boolean, name?: string) => void) {
    if (!Capacitor.isNativePlatform()) {
      // Mock for web preview
      setTimeout(() => callback(true, "Web Preview Mode"), 1000);
      return Promise.resolve({ remove: () => {} } as PluginListenerHandle);
    }
    return UniControl.addListener('connectionChange', (state) => {
      callback(state.connected, state.name);
    });
  }

  async sendHidCommand(command: { type: string; data: any }) {
    if (!Capacitor.isNativePlatform()) return;
    try {
      switch (command.type) {
        case 'MOUSE_MOVE':
          await UniControl.sendMouse({ dx: Math.round(command.data.dx), dy: Math.round(command.data.dy), buttons: 0 });
          break;
        case 'MOUSE_CLICK':
          const btn = command.data.type === 'left' ? 1 : 2;
          await UniControl.sendMouse({ dx: 0, dy: 0, buttons: btn });
          await UniControl.sendMouse({ dx: 0, dy: 0, buttons: 0 });
          break;
        case 'SCROLL':
          await UniControl.sendScroll({ dy: command.data.dy });
          break;
        case 'KEY_PRESS':
          await UniControl.sendKeyboard({ key: command.data.key });
          break;
      }
    } catch (e) { /* Squelch errors */ }
  }
}

export const nativeBridge = new NativeBridgeService();
