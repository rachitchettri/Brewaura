import { useCallback, useEffect, useMemo, useState } from 'react';

export function useSpeechSynthesis() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!supported) return undefined;

    const syncSpeaking = () => setSpeaking(window.speechSynthesis.speaking);
    const timer = window.setInterval(syncSpeaking, 300);

    return () => {
      window.clearInterval(timer);
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const cancel = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback((text) => {
    if (!supported || !text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.02;
    utterance.volume = 0.95;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [supported]);

  return useMemo(() => ({ supported, speaking, speak, cancel }), [supported, speaking, speak, cancel]);
}
