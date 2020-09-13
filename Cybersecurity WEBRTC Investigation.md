# Cybersecurity WEBRTC Investigagtion

Tianhe Lei

WebRTC means Real-time communication over web. It brings opportunities of peer-to-peer or multi-party communications but also the potential risk of leaking personal information.

In order to examine the vulnerability of a WEBRTC technology user, it is necessary to understand how WEBRTC work through the source codes and working console.


Here is an example of RTCPeerConnection process between user A and user B:

1) A creates a *RTCPeerConnection* object with listener listening to *icecandidate*;

2) A calls *getUserMedia()* to get local video input to the *localStream* and calls *addStream()* to link *localStream* to  *localPeerConnection*;
