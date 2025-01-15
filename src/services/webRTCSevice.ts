// // webRTCManager.ts
// export class WebRTCManager {
//     private peerConnection: RTCPeerConnection | null = null;
//     private localStream: MediaStream | null = null;
//     private remoteStream: MediaStream | null = null;
//     private socket: any;
//     private conversationId: string;
//     private receiverId: string;
//     private onRemoteStreamUpdate: (stream: MediaStream) => void;
        
//     constructor(
//             socket: any, 
//             conversationId: string,
//             receiverId: string,
//             onRemoteStreamUpdate: (stream: MediaStream) => void
//         ) {
//             this.socket = socket;
//             this.conversationId = conversationId;
//             this.receiverId = receiverId;
//             this.onRemoteStreamUpdate = onRemoteStreamUpdate;
//         }
  
//     // In WebRTCManager class
//         async initializePeerConnection(isInitiator: boolean, type: 'audio' | 'video') {
//             try {
//             console.log('Initializing peer connection:', { isInitiator, type });
            
//             this.peerConnection = new RTCPeerConnection({
//                 iceServers: [
//                 { urls: 'stun:stun.l.google.com:19302' },
//                 { urls: 'stun:stun1.l.google.com:19302' }, // Add backup STUN server
//                 ]
//             });

//         // Set up event handlers IMMEDIATELY after creating the connection
//         this.peerConnection.ontrack = (event) => {
//             console.log('Received remote track:', event.track.kind);
//             this.remoteStream = event.streams[0];
//             this.onRemoteStreamUpdate(this.remoteStream);
//         };

//         this.peerConnection.onicecandidate = (event) => {
//             console.log('New ICE candidate:', event.candidate);
//             if (event.candidate) {
//                 this.socket.emit('webrtc:ice-candidate', {
//                     candidate: event.candidate,
//                     conversationId: this.conversationId,
//                     receiverId: this.receiverId
//                 });
//             }
//         };

//         // Set up connection state handlers
//         this.peerConnection.onconnectionstatechange = () => {
//             console.log('Connection state:', this.peerConnection?.connectionState);
//         };

//         this.peerConnection.oniceconnectionstatechange = () => {
//             console.log('ICE connection state:', this.peerConnection?.iceConnectionState);
//         };

//         this.peerConnection.onsignalingstatechange = () => {
//             console.log('Signaling state:', this.peerConnection?.signalingState);
//         };

//         const constraints = {
//             audio: true,
//             video: type === 'video' ? {
//               width: { ideal: 1280 },
//               height: { ideal: 720 }
//             } : false
//           };
    

//           console.log('Requesting user media with constraints:', constraints);
//             this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
//             console.log('Got local stream:', this.localStream.getTracks().map(t => t.kind));

//             // Add tracks AFTER getting media
//             if (this.localStream && this.peerConnection) {
//                 this.localStream.getTracks().forEach(track => {
//                     if (this.peerConnection) {
//                         console.log('Adding track to peer connection:', track.kind);
//                         this.peerConnection.addTrack(track, this.localStream!);
//                     }
//                 });
//             }

    
//         // Log ICE gathering state
//         this.peerConnection.onicegatheringstatechange = () => {
//             console.log('ICE gathering state:', this.peerConnection?.iceGatheringState);
//         };
    
//         // Get user media
//         console.log('Requesting user media with constraints:', constraints);
//         this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
//         console.log('Got local stream:', this.localStream.getTracks().map(t => t.kind));
    
//         // Add tracks
//         this.localStream.getTracks().forEach(track => {
//             if (this.peerConnection && this.localStream) {
//             console.log('Adding track to peer connection:', track.kind);
//             this.peerConnection.addTrack(track, this.localStream);
//             }
//         });
    
//         this.peerConnection.ontrack = (event) => {
//             console.log('Received remote track:', event.track.kind);
//             this.remoteStream = event.streams[0];
//             this.onRemoteStreamUpdate(this.remoteStream);
//         };
    
//         // if (isInitiator) {
//         //     console.log('Creating offer as initiator');
//         //     const offer = await this.peerConnection.createOffer();
//         //     console.log('Created offer:', offer);
//         //     await this.peerConnection.setLocalDescription(offer);
            
//         //     this.socket.emit('webrtc:offer', {
//         //     offer,
//         //     conversationId: this.conversationId,
//         //     receiverId: this.receiverId
//         //     });
//         // }
 
//         if (isInitiator && this.peerConnection) {
//             console.log('Creating offer as initiator');
//             const offer = await this.peerConnection.createOffer();
//             console.log('Created offer:', offer);
//             await this.peerConnection.setLocalDescription(offer);
            
//             this.socket.emit('webrtc:offer', {
//                 offer,
//                 conversationId: this.conversationId,
//                 receiverId: this.receiverId
//             });
//         }

//         } catch (error) {
//             console.error('Error in initializePeerConnection:', error);
//             // Cleanup on error
//             if (this.localStream) {
//                 this.localStream.getTracks().forEach(track => track.stop());
//             }
//             if (this.peerConnection) {
//                 this.peerConnection.close();
//             }
//             this.peerConnection = null;
//             this.localStream = null;
//             throw error;
//         }
//     }

//     private connectionStateHandlers: ((state: string) => void)[] = [];

//         onConnectionStateChange(handler: (state: string) => void) {
//         this.connectionStateHandlers.push(handler);
        
//         // Set up the connection state listener if not already set
//         if (this.peerConnection && !this.peerConnection.onconnectionstatechange) {
//             this.peerConnection.onconnectionstatechange = () => {
//             const state = this.peerConnection?.connectionState || 'new';
//             this.connectionStateHandlers.forEach(h => h(state));
//             };
//         }
//         }

//         removeConnectionStateChangeHandler(handler: (state: string) => void) {
//         this.connectionStateHandlers = this.connectionStateHandlers.filter(h => h !== handler);
//         }
    
//     async handleOffer(offer: RTCSessionDescriptionInit) {
//       if (!this.peerConnection) return;
  
//       try {
//         await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//         const answer = await this.peerConnection.createAnswer();
//         await this.peerConnection.setLocalDescription(answer);
//         this.socket.emit('webrtc:answer', { answer });
//       } catch (error) {
//         console.error('Error handling offer:', error);
//       }
//     }
  
//     async handleAnswer(answer: RTCSessionDescriptionInit) {
//       if (!this.peerConnection) return;
  
//       try {
//         await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//       } catch (error) {
//         console.error('Error handling answer:', error);
//       }
//     }
  
//     async handleIceCandidate(candidate: RTCIceCandidateInit) {
//       if (!this.peerConnection) return;
  
//       try {
//         await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//       } catch (error) {
//         console.error('Error handling ICE candidate:', error);
//       }
//     }
  
//     getLocalStream() {
//       return this.localStream;
//     }
  
//     getRemoteStream() {
//       return this.remoteStream;
//     }
  
//     async cleanup() {
//       // Stop all tracks in local stream
//       this.localStream?.getTracks().forEach(track => track.stop());
      
//       // Close peer connection
//       if (this.peerConnection) {
//         this.peerConnection.close();
//         this.peerConnection = null;
//       }
  
//       this.localStream = null;
//       this.remoteStream = null;
//     }
//   }

// -------- vesion 2 ------
// webRTCManager.ts
// export class WebRTCManager {
//     private peerConnection: RTCPeerConnection | null = null;
//     private localStream: MediaStream | null = null;
//     private remoteStream: MediaStream | null = null;
//     private socket: any;
//     private conversationId: string;
//     private receiverId: string;
//     private onRemoteStreamUpdate: (stream: MediaStream) => void;
//     private connectionStateHandlers: ((state: string) => void)[] = [];

//     constructor(
//         socket: any,
//         conversationId: string,
//         receiverId: string,
//         onRemoteStreamUpdate: (stream: MediaStream) => void
//     ) {
//         this.socket = socket;
//         this.conversationId = conversationId;
//         this.receiverId = receiverId;
//         this.onRemoteStreamUpdate = onRemoteStreamUpdate;
//     }

//     async initializePeerConnection(isInitiator: boolean, type: 'audio' | 'video') {
//         try {
//             console.log('Initializing peer connection:', { isInitiator, type });

//             // Create peer connection with STUN servers
//             this.peerConnection = new RTCPeerConnection({
//                 iceServers: [
//                     { urls: 'stun:stun.l.google.com:19302' },
//                     { urls: 'stun:stun1.l.google.com:19302' },
//                 ],
//             });

//             // Event handlers
//             this.peerConnection.ontrack = (event) => {
//                 console.log('Received remote track:', event.track.kind);
//                 this.remoteStream = event.streams[0];
//                 this.onRemoteStreamUpdate(this.remoteStream);
//             };

//             this.peerConnection.onicecandidate = (event) => {
//                 if (event.candidate) {
//                     console.log('New ICE candidate:', event.candidate);
//                     this.socket.emit('webrtc:ice-candidate', {
//                         candidate: event.candidate,
//                         conversationId: this.conversationId,
//                         receiverId: this.receiverId,
//                     });
//                 }
//             };

//             this.peerConnection.onconnectionstatechange = () => {
//                 const state = this.peerConnection?.connectionState || 'new';
//                 console.log('Connection state:', state);
//                 this.connectionStateHandlers.forEach((handler) => handler(state));
//             };

//             this.peerConnection.oniceconnectionstatechange = () => {
//                 console.log('ICE connection state:', this.peerConnection?.iceConnectionState);
//             };

//             // Get media stream and add tracks
//             this.localStream = await this.getMediaStream(type);
//             this.addTracksToConnection(this.localStream);

//             if (isInitiator && this.peerConnection) {
//                 console.log('Creating offer as initiator');
//                 const offer = await this.peerConnection.createOffer();
//                 await this.peerConnection.setLocalDescription(offer);

//                 this.socket.emit('webrtc:offer', {
//                     offer,
//                     conversationId: this.conversationId,
//                     receiverId: this.receiverId,
//                 });
//             }
//         } catch (error) {
//             console.error('Error in initializePeerConnection:', error);
//             this.cleanup(); // Cleanup on error
//             throw error;
//         }
//     }

//     private async getMediaStream(type: 'audio' | 'video'): Promise<MediaStream> {
//         const constraints = {
//             audio: true,
//             video: type === 'video' ? { width: { ideal: 1280 }, height: { ideal: 720 } } : false,
//         };
//         console.log('Requesting user media with constraints:', constraints);
//         const stream = await navigator.mediaDevices.getUserMedia(constraints);
//         console.log('Got local stream:', stream.getTracks().map((t) => t.kind));
//         return stream;
//     }

//     private addTracksToConnection(stream: MediaStream) {
//         stream.getTracks().forEach((track) => {
//             console.log('Adding track to peer connection:', track.kind);
//             this.peerConnection?.addTrack(track, stream);
//         });
//     }

//     async handleOffer(offer: RTCSessionDescriptionInit) {
//         try {
//             if (!this.peerConnection) throw new Error('PeerConnection is not initialized.');
//             await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//             const answer = await this.peerConnection.createAnswer();
//             await this.peerConnection.setLocalDescription(answer);
//             this.socket.emit('webrtc:answer', { answer });
//         } catch (error) {
//             console.error('Error handling offer:', error);
//         }
//     }

//     async handleAnswer(answer: RTCSessionDescriptionInit) {
//         try {
//             if (!this.peerConnection) throw new Error('PeerConnection is not initialized.');
//             await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//         } catch (error) {
//             console.error('Error handling answer:', error);
//         }
//     }

//     async handleIceCandidate(candidate: RTCIceCandidateInit) {
//         try {
//             if (!this.peerConnection || !this.peerConnection.remoteDescription) {
//                 console.warn('Remote description not set yet. Queueing candidate.');
//                 return;
//             }
//             await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//         } catch (error) {
//             console.error('Error handling ICE candidate:', error);
//         }
//     }

//     onConnectionStateChange(handler: (state: string) => void) {
//         this.connectionStateHandlers.push(handler);
//     }

//     removeConnectionStateChangeHandler(handler: (state: string) => void) {
//         this.connectionStateHandlers = this.connectionStateHandlers.filter((h) => h !== handler);
//     }

//     getLocalStream() {
//         return this.localStream;
//     }

//     getRemoteStream() {
//         return this.remoteStream;
//     }

//     async cleanup() {
//         console.log('Cleaning up WebRTC resources...');
//         this.localStream?.getTracks().forEach((track) => track.stop());
//         if (this.peerConnection) {
//             this.peerConnection.close();
//             this.peerConnection = null;
//         }
//         this.localStream = null;
//         this.remoteStream = null;
//         // Remove socket listeners to prevent memory leaks
//         this.socket.off('webrtc:ice-candidate');
//         this.socket.off('webrtc:offer');
//         this.socket.off('webrtc:answer');
//     }
// }

// --------- version 3 -------------
export const webRTCService = ()=>{
    
}