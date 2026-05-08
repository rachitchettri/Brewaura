import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import BaristaIllustration from '../components/BaristaIllustration';
import { useBrewingAudio } from '../hooks/useBrewingAudio';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { stageMeta } from './stageMeta';

const defaultStages = ['fill_water', 'add_coffee', 'assemble', 'heat', 'brew', 'serve'];

function Steam({ active }) {
  return (
    <div className="absolute left-1/2 top-8 flex -translate-x-1/2 gap-4">
      {[0, 1, 2].map((item) => (
        <motion.span
          key={item}
          className="block h-14 w-2 rounded-full bg-crema/30 blur-sm"
          animate={active ? { y: [-4, -36], opacity: [0, 0.8, 0], scaleX: [1, 1.8] } : { opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1.8, delay: item * 0.28 }}
        />
      ))}
    </div>
  );
}

function MokaVisual({ stage }) {
  const showWater = ['fill_water', 'add_coffee', 'assemble', 'heat', 'brew', 'serve'].includes(stage);
  const showGrounds = ['add_coffee', 'assemble', 'heat', 'brew', 'serve'].includes(stage);
  const assembled = ['assemble', 'heat', 'brew', 'serve'].includes(stage);
  const heating = ['heat', 'brew'].includes(stage);
  const brewing = ['brew', 'serve'].includes(stage);
  const serving = stage === 'serve';

  return (
    <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] bg-gradient-to-b from-crema/10 to-espresso/20 p-8">
      <Steam active={heating || brewing} />
      <motion.div
        className="absolute bottom-10 left-1/2 h-8 w-56 -translate-x-1/2 rounded-full bg-copper/50 blur-xl"
        animate={heating ? { scale: [1, 1.2, 1], opacity: [0.45, 0.8, 0.45] } : { opacity: 0.2 }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      />

      <div className="absolute bottom-16 left-1/2 h-[26rem] w-72 -translate-x-1/2">
        <motion.div
          className="absolute bottom-0 left-1/2 h-40 w-56 -translate-x-1/2 rounded-b-[3rem] rounded-t-xl border-4 border-latte/70 bg-mocha/70"
          animate={{ y: assembled ? 0 : 18 }}
        >
          <AnimatePresence>
            {showWater && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: heating || brewing ? '72%' : '58%' }}
                exit={{ height: 0 }}
                className="absolute bottom-0 left-3 right-3 rounded-b-[2.4rem] bg-sky-300/70"
              />
            )}
          </AnimatePresence>
          {heating && <div className="absolute bottom-4 left-8 right-8 h-3 animate-pulse rounded-full bg-white/40" />}
        </motion.div>

        <motion.div
          className="absolute bottom-36 left-1/2 h-24 w-44 -translate-x-1/2 rounded-2xl border-4 border-latte/70 bg-espresso/95"
          animate={{ opacity: showGrounds ? 1 : 0.25, y: assembled ? 0 : -16 }}
        >
          {showGrounds && (
            <motion.div
              className="absolute bottom-3 left-4 right-4 grid grid-cols-7 gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Array.from({ length: 21 }).map((_, index) => (
                <span key={index} className="h-2 w-2 rounded-full bg-copper" />
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="absolute bottom-56 left-1/2 h-44 w-64 -translate-x-1/2 rounded-t-[4rem] border-4 border-latte/70 bg-gradient-to-b from-mocha to-espresso"
          animate={{ y: assembled ? 0 : -68, opacity: assembled ? 1 : 0.55 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-latte/30" />
          {brewing && (
            <motion.div
              className="absolute bottom-8 left-1/2 w-6 -translate-x-1/2 rounded-full bg-copper"
              initial={{ height: 0 }}
              animate={{ height: serving ? 112 : 84 }}
              transition={{ duration: 1.1 }}
            />
          )}
          {brewing && <motion.div className="absolute bottom-5 left-10 right-10 h-12 rounded-b-[2rem] bg-copper/80" initial={{ scaleY: 0 }} animate={{ scaleY: serving ? 1 : 0.5 }} style={{ transformOrigin: 'bottom' }} />}
        </motion.div>

        <motion.div
          className="absolute -right-7 bottom-64 h-24 w-24 rounded-r-full border-8 border-latte/50 border-l-transparent"
          animate={{ opacity: assembled ? 1 : 0.2 }}
        />
      </div>

      {serving && (
        <motion.div className="absolute bottom-12 right-12" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}>
          <div className="h-20 w-28 rounded-b-3xl rounded-t-md bg-crema/90" />
          <motion.div className="absolute -left-16 -top-20 h-28 w-3 origin-top rounded-full bg-copper" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} />
        </motion.div>
      )}
    </div>
  );
}

export default function BrewingSimulator({ recipe }) {
  const stages = useMemo(() => recipe?.animationStages?.length ? recipe.animationStages : defaultStages, [recipe]);
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [narrationEnabled, setNarrationEnabled] = useState(false);
  const { supported: speechSupported, speaking, speak, cancel } = useSpeechSynthesis();
  const { audioEnabled, audioSupported, setAudioEnabled, playStageCue, setAmbience } = useBrewingAudio();
  const stage = stages[index];
  const currentStep = recipe?.steps?.[index] || stageMeta[stage]?.description || '';
  const progress = ((index + 1) / stages.length) * 100;
  const narrationText = `${stageMeta[stage]?.title || 'Brewing step'}. ${stageMeta[stage]?.description || ''} Instruction: ${currentStep}`;

  useEffect(() => {
    if (!autoplay) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => {
        if (current >= stages.length - 1) {
          setAutoplay(false);
          return current;
        }
        return current + 1;
      });
    }, 2300);
    return () => clearInterval(timer);
  }, [autoplay, stages.length]);

  useEffect(() => {
    playStageCue(stage);
    setAmbience(['heat', 'brew'].includes(stage));

    if (narrationEnabled) {
      speak(narrationText);
    }

    return () => setAmbience(false);
  }, [narrationEnabled, narrationText, playStageCue, setAmbience, speak, stage]);

  const goTo = (nextIndex) => setIndex(Math.max(0, Math.min(stages.length - 1, nextIndex)));

  const toggleNarration = () => {
    if (narrationEnabled) {
      cancel();
      setNarrationEnabled(false);
      return;
    }

    setNarrationEnabled(true);
    speak(narrationText);
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="grid gap-5">
        <MokaVisual stage={stage} />
        <BaristaIllustration
          mood={stage === 'serve' ? 'serve' : speaking ? 'talk' : 'guide'}
          caption={speaking ? 'Reading this instruction out loud so you can keep your hands on the brew.' : currentStep}
        />
      </div>
      <div className="glass-card rounded-[2rem] p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-latte/70">Brewing simulator</p>
        <AnimatePresence mode="wait">
          <motion.div key={stage} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <h2 className="mt-3 text-4xl font-black coffee-gradient">{stageMeta[stage]?.title}</h2>
            <p className="mt-4 text-lg leading-8 text-crema/75">{stageMeta[stage]?.description}</p>
            <div className="mt-5 rounded-3xl bg-crema/10 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-latte/70">Instruction read-aloud text</p>
              <p className="mt-2 leading-7 text-crema/80">{currentStep}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 h-3 overflow-hidden rounded-full bg-crema/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-copper to-latte" animate={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-crema/60">Stage {index + 1} of {stages.length}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            disabled={!audioSupported}
            className="inline-flex items-center gap-2 rounded-full bg-crema/10 px-5 py-3 font-bold transition hover:bg-crema/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />} {audioEnabled ? 'Sound On' : 'Sound Off'}
          </button>
          <button
            onClick={toggleNarration}
            disabled={!speechSupported}
            className="inline-flex items-center gap-2 rounded-full bg-crema/10 px-5 py-3 font-bold transition hover:bg-crema/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Volume2 size={18} /> {narrationEnabled ? 'Stop Reading' : 'Read Aloud'}
          </button>
          <button onClick={() => goTo(index - 1)} className="rounded-full bg-crema/10 p-3 transition hover:bg-crema/20" aria-label="Previous stage"><SkipBack /></button>
          <button onClick={() => setAutoplay((value) => !value)} className="inline-flex items-center gap-2 rounded-full bg-copper px-5 py-3 font-bold text-white transition hover:bg-latte hover:text-espresso">
            {autoplay ? <Pause size={18} /> : <Play size={18} />} {autoplay ? 'Pause' : 'Autoplay'}
          </button>
          <button onClick={() => goTo(index + 1)} className="rounded-full bg-crema/10 p-3 transition hover:bg-crema/20" aria-label="Next stage"><SkipForward /></button>
          <button onClick={() => { setIndex(0); setAutoplay(false); cancel(); }} className="rounded-full bg-crema/10 p-3 transition hover:bg-crema/20" aria-label="Reset"><RotateCcw /></button>
        </div>

        <div className="mt-8 grid gap-3">
          {stages.map((item, itemIndex) => (
            <button
              key={item}
              onClick={() => goTo(itemIndex)}
              className={`rounded-2xl border p-4 text-left transition ${itemIndex === index ? 'border-latte bg-latte/15' : 'border-crema/10 bg-crema/5 hover:bg-crema/10'}`}
            >
              <span className="font-bold">{stageMeta[item]?.title}</span>
              <span className="block text-sm text-crema/60">{recipe?.steps?.[itemIndex] || stageMeta[item]?.description}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
