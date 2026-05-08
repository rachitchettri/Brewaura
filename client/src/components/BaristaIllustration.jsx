import { motion } from 'framer-motion';

export default function BaristaIllustration({ mood = 'guide', caption = 'I will guide every step.' }) {
  return (
    <motion.figure
      className="relative overflow-hidden rounded-[2rem] border border-crema/15 bg-gradient-to-br from-crema/15 via-copper/10 to-espresso/50 p-5"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Friendly barista illustration"
    >
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-copper/25 blur-3xl" />
      <div className="absolute -bottom-16 left-8 h-40 w-40 rounded-full bg-latte/10 blur-3xl" />

      <div className="relative mx-auto h-56 max-w-xs">
        <motion.div
          className="absolute left-1/2 top-7 h-20 w-20 -translate-x-1/2 rounded-full bg-[#9b5a36] shadow-2xl"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <div className="absolute -top-5 left-1/2 h-8 w-28 -translate-x-1/2 rounded-t-full bg-crema" />
          <div className="absolute -top-1 left-1/2 h-5 w-32 -translate-x-1/2 rounded-full bg-espresso" />
          <div className="absolute left-5 top-8 h-2 w-2 rounded-full bg-espresso" />
          <div className="absolute right-5 top-8 h-2 w-2 rounded-full bg-espresso" />
          <div className="absolute bottom-6 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full bg-crema/80" />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-24 h-28 w-36 -translate-x-1/2 rounded-t-[3rem] rounded-b-2xl bg-crema"
          animate={{ rotate: mood === 'serve' ? [-1, 1, -1] : 0 }}
          transition={{ repeat: Infinity, duration: 2.2 }}
        >
          <div className="absolute left-1/2 top-0 h-full w-14 -translate-x-1/2 bg-espresso/90" />
          <div className="absolute left-5 top-7 h-8 w-8 rounded-full border-4 border-copper" />
          <div className="absolute right-5 top-7 h-8 w-8 rounded-full border-4 border-copper" />
        </motion.div>

        <motion.div
          className="absolute left-6 top-32 h-5 w-24 origin-right rounded-full bg-[#9b5a36]"
          animate={{ rotate: mood === 'talk' ? [-8, -18, -8] : -10 }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        />
        <motion.div
          className="absolute right-8 top-31 h-5 w-24 origin-left rounded-full bg-[#9b5a36]"
          animate={{ rotate: mood === 'serve' ? [8, 18, 8] : 12 }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        />

        <div className="absolute right-2 top-40 h-12 w-16 rounded-b-2xl rounded-t-md bg-latte shadow-lg">
          <div className="absolute -right-4 top-3 h-7 w-7 rounded-full border-4 border-latte" />
          <motion.div
            className="absolute left-5 top-2 h-8 w-2 rounded-full bg-copper"
            animate={{ scaleY: [0.25, 1, 0.25] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          />
        </div>
      </div>

      <figcaption className="relative rounded-2xl bg-espresso/70 p-4 text-sm leading-6 text-crema/80">
        <span className="font-black text-latte">Barista note: </span>{caption}
      </figcaption>
    </motion.figure>
  );
}
