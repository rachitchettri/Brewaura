import { useCallback, useEffect, useRef, useState } from 'react';

const stageSoundMap = {
  fill_water: { frequency: 430, duration: 0.16, type: 'sine' },
  add_coffee: { frequency: 180, duration: 0.12, type: 'triangle' },
  assemble: { frequency: 260, duration: 0.14, type: 'square' },
  heat: { frequency: 620, duration: 0.2, type: 'sawtooth' },
  brew: { frequency: 340, duration: 0.24, type: 'sine' },
  serve: { frequency: 520, duration: 0.28, type: 'triangle' },
};

export function useBrewingAudio() {
  const contextRef = useRef(null);
  const ambienceRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const supported = typeof window !== 'undefined' && Boolean(window.AudioContext || window.webkitAudioContext);

  const getContext = useCallback(() => {
    if (!supported) return null;
    if (!contextRef.current) {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      contextRef.current = new AudioContextConstructor();
    }
    return contextRef.current;
  }, [supported]);

  const stopAmbience = useCallback(() => {
    const ambience = ambienceRef.current;
    if (!ambience) return;
    ambience.gain.gain.cancelScheduledValues(ambience.context.currentTime);
    ambience.gain.gain.setTargetAtTime(0, ambience.context.currentTime, 0.05);
    window.setTimeout(() => ambience.oscillator.stop(), 180);
    ambienceRef.current = null;
  }, []);

  const setAudioEnabled = useCallback((nextEnabled) => {
    if (!supported) return;
    const context = getContext();
    if (context?.state === 'suspended') context.resume();
    setEnabled(nextEnabled);
    if (!nextEnabled) stopAmbience();
  }, [getContext, stopAmbience, supported]);

  const playStageCue = useCallback((stage) => {
    if (!enabled || !supported) return;
    const context = getContext();
    if (!context) return;

    const cue = stageSoundMap[stage] || stageSoundMap.brew;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = cue.type;
    oscillator.frequency.setValueAtTime(cue.frequency, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(80, cue.frequency * 0.72), context.currentTime + cue.duration);
    gain.gain.setValueAtTime(0.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + cue.duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + cue.duration + 0.03);
  }, [enabled, getContext, supported]);

  const setAmbience = useCallback((active) => {
    if (!enabled || !supported) {
      stopAmbience();
      return;
    }

    if (!active) {
      stopAmbience();
      return;
    }

    const context = getContext();
    if (!context || ambienceRef.current) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 86;
    gain.gain.value = 0.0001;
    gain.gain.setTargetAtTime(0.025, context.currentTime, 0.16);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    ambienceRef.current = { context, gain, oscillator };
  }, [enabled, getContext, stopAmbience, supported]);

  useEffect(() => () => {
    stopAmbience();
    contextRef.current?.close?.();
  }, [stopAmbience]);

  return { audioEnabled: enabled, audioSupported: supported, setAudioEnabled, playStageCue, setAmbience };
}
