const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, 
   // {
  //  host: '/',
  //  port: '5001'
  //  }
  {
    config: {'iceServers': [
      //{ url: 'stun:stun.l.google.com:19302' },
      { url: 'turn:192.168.1.105:3478', username:'tianhel', credential: 'webrtc' }
    ]} /* Sample servers, please use appropriate ones */
  }
)
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')

        console.log(call.tostring)
        
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    myPeer.on('connection', function(conn) {
        conn.on('data', function(data){
          var dataRec = document.createElement("dataRec");
          dataRec.textContent = data;
          document.getElementById("dataRecvTA").value = data
          document.all.dataRecvITA.innerText = data;
          document.getElementsByTagName("dr")[0].appendChild(dataRec);
        });
    });

    socket.on('user-connected', userId => {
        console.log('User connected: ' + userId)
        connectToNewUser(userId, stream)
    })
})

socket.on('user-disconnected', userId => {
    console.log('User Disconnected: ' + userId)
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })
    
    var conn = myPeer.connect(userId);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function(){
    // here you have conn.id
        var text = document.getElementById("text").value;    
        conn.send(text);
    });
    
    peers[userId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}