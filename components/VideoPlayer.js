import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

function VideoPlayer({ videoUri }) {
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});

    const handlePress = async () => {
        if (status.isPlaying) {
            await videoRef.current.pauseAsync();
        } else {
            await videoRef.current.playAsync();
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Video
                ref={videoRef}
                source={{ uri: videoUri }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={false}
                isLooping
                style={{ height: 200, width: '100%' }}
                onPlaybackStatusUpdate={setStatus}
            />
        </TouchableOpacity>
    );
}

export default VideoPlayer;