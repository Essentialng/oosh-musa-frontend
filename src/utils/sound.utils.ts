// callSounds.ts
export class CallSoundManager {
    private incomingCallSound: HTMLAudioElement;
    private outgoingCallSound: HTMLAudioElement;
    private callEndSound: HTMLAudioElement;
    
    constructor() {
      // Create audio elements
      this.incomingCallSound = new Audio('/sounds/incoming-call.mp3');
      this.outgoingCallSound = new Audio('/sounds/outgoing-call.mp3');
      this.callEndSound = new Audio('/sounds/call-end.mp3');
      
      // Configure audio settings
      this.incomingCallSound.loop = true;
      this.outgoingCallSound.loop = true;
      this.callEndSound.loop = false;
      
      // Set volume
      this.incomingCallSound.volume = 0.7;
      this.outgoingCallSound.volume = 0.5;
      this.callEndSound.volume = 0.6;
    }
  
    public startIncomingCall() {
      this.stopAllSounds();
      this.incomingCallSound.play().catch(err => console.log('Error playing sound:', err));
    }
  
    public startOutgoingCall() {
      this.stopAllSounds();
      this.outgoingCallSound.play().catch(err => console.log('Error playing sound:', err));
    }
  
    public playEndCall() {
      this.stopAllSounds();
      this.callEndSound.play().catch(err => console.log('Error playing sound:', err));
    }
  
    public stopAllSounds() {
      this.incomingCallSound.pause();
      this.incomingCallSound.currentTime = 0;
      this.outgoingCallSound.pause();
      this.outgoingCallSound.currentTime = 0;
      this.callEndSound.pause();
      this.callEndSound.currentTime = 0;
    }
  }