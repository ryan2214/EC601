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

&nbsp;

# How to use WebRTC session description in attack

Store and analyze all user IPs to build a social network for further attack,

Where to store? Server.

When to store? On connection established.

What to store? IP address abstacted from sdp and ICE candidates.

More, using victim's session description to observe or interfere an on-going video talk. 

# Fiddler

Tool focusing on catching requests and responses in _application layer_.

![traffic_local.png](https://ryan2214.github.io/EC601/traffic_local.png)

Traffic of mediastream established captured by Fiddler.

![traffic_details.png](https://ryan2214.github.io/EC601/traffic_details.png)

Details of traffic.

What we want to store is in the content of Websocket connection. Because Websocket is an API between _Application Layer_ and _Transport Layer_, the content is not able to captured by Fiddler.

# Wireshark

Tool of analyzing packets in _transport layer_.

![](https://ryan2214.github.io/EC601/ws_packets.png)

There goes packets in STUN, DTLSv1.2, UDP Protocols. 

We can see the brief content of them, but when we track a certain UDP stream, the content is encrypted.

![](https://ryan2214.github.io/EC601/ws_stream.png)

Maybe the peerjs used in our test website completes the job by WebRTC function inside the script, it keeps us from directly using the sdp content.

But if developer is using original WebRTC script, this will still bring some troubles for users.

# Access to sdp in original WebRTC

![](https://ryan2214.github.io/EC601/current_localdes.png)

Calling sdp in console of one webrtc/sample case. We could see the local IP and ICE candidates in it.

![](https://ryan2214.github.io/EC601/candidates.png)

A closer look to ICE candidates.

![](https://ryan2214.github.io/EC601/current_remotedes.png)

More of this, about remote peer.

# How to store something on server

![](https://ryan2214.github.io/EC601/store_userId.png)

Open a file on the server from server.js at the beginning, and append user info (here is my peerjs example, IP not available) to this file when new user joins.

There could be more logic on how to store these IPs to make sense.

