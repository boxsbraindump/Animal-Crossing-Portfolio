import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../src/components/Icon';

const trackUrl = new URL('./audio/island-bossa.mp3', import.meta.url).href;
const trackTitle = 'Island Bossa';

const formatTime = (value: number) => {
    if (!Number.isFinite(value)) return '0:00';
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const S = {
    player: {
        position: 'fixed' as const,
        zIndex: 90,
        display: 'grid',
        gridTemplateColumns: '40px minmax(0, 1fr)',
        alignItems: 'center',
        gap: 12,
        width: 310,
        padding: '12px 14px',
        borderRadius: 24,
        background: 'rgba(247, 243, 223, 0.94)',
        border: '2px solid rgba(159, 146, 125, 0.52)',
        boxShadow: '0 6px 0 rgba(189, 174, 160, 0.78)',
        backdropFilter: 'blur(8px)',
        color: '#725d42',
    } as React.CSSProperties,
    playButton: {
        width: 40,
        height: 40,
        border: '2px solid #19c8b9',
        borderRadius: '50%',
        background: '#82d5bb',
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 0 #5a9e1e',
        cursor: 'pointer',
        fontWeight: 900,
        fontSize: 14,
    } as React.CSSProperties,
    title: {
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        fontSize: 12,
        fontWeight: 900,
        lineHeight: 1.2,
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    } as React.CSSProperties,
    progressTrack: {
        height: 8,
        borderRadius: 999,
        background: '#d4c9b4',
        overflow: 'hidden',
        marginTop: 8,
        cursor: 'pointer',
    } as React.CSSProperties,
    progressFill: {
        height: '100%',
        borderRadius: 999,
        background: '#19c8b9',
        transition: 'width 0.15s linear',
    } as React.CSSProperties,
    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 6,
        fontSize: 11,
        fontWeight: 800,
        color: '#8a7b66',
    } as React.CSSProperties,
};

interface AudioPlayerProps {
    compact?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ compact = false }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const progress = useMemo(() => {
        if (!duration) return 0;
        return Math.min(100, (currentTime / duration) * 100);
    }, [currentTime, duration]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onLoaded = () => setDuration(audio.duration || 0);
        const onTime = () => setCurrentTime(audio.currentTime || 0);
        const onEnded = () => setIsPlaying(false);

        audio.addEventListener('loadedmetadata', onLoaded);
        audio.addEventListener('timeupdate', onTime);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('loadedmetadata', onLoaded);
            audio.removeEventListener('timeupdate', onTime);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);

    const togglePlayback = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            await audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const seek = (event: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        const track = progressRef.current;
        if (!audio || !track || !duration) return;

        const rect = track.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        audio.currentTime = ratio * duration;
        setCurrentTime(audio.currentTime);
    };

    if (compact) {
        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '32px minmax(92px, 150px)',
                    alignItems: 'center',
                    gap: 8,
                    minWidth: 150,
                    color: '#725d42',
                }}
                aria-label="Music player"
            >
                <audio ref={audioRef} src={trackUrl} preload="metadata" loop />
                <button
                    type="button"
                    style={{
                        ...S.playButton,
                        width: 32,
                        height: 32,
                        fontSize: 11,
                        boxShadow: '0 3px 0 #5a9e1e',
                    }}
                    onClick={togglePlayback}
                    aria-label={isPlaying ? 'Pause music' : 'Play music'}
                    title={trackTitle}
                >
                    {isPlaying ? 'II' : '>'}
                </button>
                <div ref={progressRef} style={{ ...S.progressTrack, height: 7, marginTop: 0 }} onClick={seek}>
                    <div style={{ ...S.progressFill, width: `${progress}%` }} />
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                ...S.player,
                right: 22,
                left: 'auto',
                bottom: 22,
            }}
            aria-label="Music player"
        >
            <audio ref={audioRef} src={trackUrl} preload="metadata" loop />
            <button
                type="button"
                style={{
                    ...S.playButton,
                }}
                onClick={togglePlayback}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
                {isPlaying ? 'II' : 'Play'}
            </button>
            <div>
                <div style={S.title}>
                    <Icon name="icon-miles" size={16} bounce={isPlaying} />
                    <span>{trackTitle}</span>
                </div>
                <div
                    ref={progressRef}
                    style={{
                        ...S.progressTrack,
                    }}
                    onClick={seek}
                >
                    <div style={{ ...S.progressFill, width: `${progress}%` }} />
                </div>
                <div
                    style={{
                        ...S.meta,
                    }}
                >
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
};
