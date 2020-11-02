# EC601
 Cybersecurity WEBRTC

# start localhost peerjs server

peerjs --port 3001

# auto deploy server

npm run devStart

# start video chat

1) go to url: localhost:5000 (https://webrtc-talk.herokuapp.com/ now available)

2) copy the url in your current browser to another

3) bingo!

# Spots need protection

Public IP:

From offer and answer, both peer get IP of the other.

Local network:

https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/

Bandwidth:

DDoS, flooding

Peer Identity:

Session description, token, 3rd-party Identity
