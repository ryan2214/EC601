# Cybersecurity WEBRTC Investigagtion

Tianhe Lei

WebRTC means Real-time communication over web. It brings opportunities of peer-to-peer or multi-party communications but also the potential risk of leaking personal information.

In order to examine the vulnerability of a WEBRTC technology user, it is necessary to understand how WEBRTC work through the source codes and working console.


Here is an example of **RTCPeerConnection** process between user A and user B:

1) A creates a *RTCPeerConnection* object with listener listening to *icecandidate*;

2) A calls *getUserMedia()* to get local video input to the *localStream* and calls *addStream()* to link *localStream* to  *localPeerConnection*;

3) When candidate is found, the listener will be triggered;

4) A send candidate data to B, the *RTCPeerConnection* objects are on the same page;

5) When B got the candidate data from A, B calls *addIceCandidate()*;


And inside of this connection, A and B exchange information in *Session Description Protocol* format, which is carried by *offer* and *answer*:

1) A runs *createOffer()* from its *RTCPeerConnection* object;

2) If offer is successfully created, A calls *setLocalDescription()* and send this description to B;

3) B calls *setRemoteDescription()* to set the description received from A as its remote description;

4) B runs *createAnswer()* by giving the remote description and set the answer as B's localdescription;

5) When A gets B's session description, A sets that as A's remote description by *setRemoteDescription()*;

6) Exchange complete.

Console log of this process: [log](https://github.com/ryan2214/EC601/blob/master/log/127.0.0.1-1600005576370.log)


WebRTC also allows data exchange between users by **RTCDataChannel**, which enables text chat between two users. With the help of signaling service, WebRTC could support a chat room.


WebRTC is mainly about three parts: *getUserMedia()*, *RTCPeerConnection* and *RTCDataChannel*.

From the view of cybersecurity, *MediaDevices.getUserMedia()* may be an dangerous part of user privacy. And there are several features that helps keep this method safe.

1) *getUserMedia()* can only be used in secure contexts like HTPPS pages or localhost pages;

2) Only by receiving user permission could *getUserMedia()* get access to user's audio and video input;

3) Browsers should always display an indicator if user's camera or microphone is in use, and another indicator showing if the permission of using such input device is granted;

In normal cases, these three rules shall keep this method under control.

