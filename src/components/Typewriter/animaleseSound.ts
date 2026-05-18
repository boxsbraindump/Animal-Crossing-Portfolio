interface AnimaleseOptions {
    src: string;
    pitch?: number;
    volume?: number;
}

const LETTER_SECONDS = 0.15;
const LETTER_OFFSET_SECONDS = 44 / 44100;
const PLAY_SECONDS = 0.055;
const DEFAULT_VOLUME = 0.045;

let audioContext: AudioContext | null = null;
let userGestureReady = false;
const buffers = new Map<string, Promise<AudioBuffer>>();

const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (audioContext) return audioContext;

    const AudioContextCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextCtor) return null;
    audioContext = new AudioContextCtor();
    return audioContext;
};

const loadBuffer = (src: string, context: AudioContext): Promise<AudioBuffer> => {
    const existing = buffers.get(src);
    if (existing) return existing;

    const promise = fetch(src)
        .then((response) => {
            if (!response.ok) throw new Error(`Unable to load animalese audio: ${response.status}`);
            return response.arrayBuffer();
        })
        .then((arrayBuffer) => context.decodeAudioData(arrayBuffer));

    buffers.set(src, promise);
    return promise;
};

export const unlockAnimaleseAudio = (): void => {
    userGestureReady = true;
    const context = getAudioContext();
    if (context?.state === 'suspended') {
        void context.resume();
    }
};

export const playAnimaleseLetter = async (
    letter: string,
    { src, pitch = 1, volume = DEFAULT_VOLUME }: AnimaleseOptions
): Promise<void> => {
    if (!userGestureReady || !/^[a-z]$/i.test(letter)) return;

    const context = getAudioContext();
    if (!context) return;
    if (context.state === 'suspended') {
        await context.resume();
    }

    const buffer = await loadBuffer(src, context);
    const letterIndex = letter.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    const offset = LETTER_OFFSET_SECONDS + letterIndex * LETTER_SECONDS;
    if (offset >= buffer.duration) return;

    const source = context.createBufferSource();
    const gain = context.createGain();

    source.buffer = buffer;
    source.playbackRate.value = pitch;
    gain.gain.value = volume;

    source.connect(gain);
    gain.connect(context.destination);
    source.start(0, offset, Math.min(PLAY_SECONDS, buffer.duration - offset));
};
