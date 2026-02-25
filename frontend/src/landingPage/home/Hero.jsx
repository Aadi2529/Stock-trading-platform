import { motion, useMotionValue, useTransform } from "framer-motion";
import CountUp from "react-countup";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import bannerImg from "../../assets/bannerImg.jpg";

import { useEffect } from "react";

const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    x.set(clientX - window.innerWidth / 2);
    y.set(clientY - window.innerHeight / 2);
  };

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-gradient-to-r from-[#1a0000] via-[#2b0000] to-[#1a0000] overflow-hidden text-white"
    >
      {/* Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 40 },
            size: { value: 2 },
            move: { speed: 0.5 },
            opacity: { value: 0.3 },
            links: { enable: true, color: "#ff2d2d", opacity: 0.2 },
          },
        }}
        className="absolute inset-0"
      />

      {/* Animated Graph Line SVG */}
      <svg
        className="absolute bottom-0 w-full h-96 opacity-40"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,250 C300,150 600,300 900,200 C1200,100 1440,250 1440,250 L1440,320 L0,320 Z"
          fill="none"
          stroke="#ff2d2d"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* LEFT SIDE */}
        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Navigate Markets with <br />
            <span className="text-red-500">Confidence</span>
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full shadow-lg">
              Start Trading
            </button>
          </div>
        </div>

        {/* RIGHT SIDE PARALLAX IMAGE */}
        <motion.div
          style={{ rotateX, rotateY }}
          className="flex-1 flex justify-center relative perspective-1000"
        >
          <div className="relative w-64 sm:w-80 lg:w-[420px] aspect-square rounded-full overflow-hidden border-4 border-red-500 shadow-2xl">
            <img
              src={bannerImg}
              alt="Trader"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Glass Blur Stats Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-8 right-0 sm:right-10 backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl w-60"
          >
            <p className="text-sm">Last Year Winning Ratio</p>

            <h3 className="text-3xl font-bold text-red-400">
              <CountUp end={84.65} decimals={2} duration={3} />%
            </h3>

            <p className="text-green-400 text-sm">
              +<CountUp end={6.39} decimals={2} duration={3} />%
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Trading Numbers Flicker */}
      <div className="absolute bottom-10 left-10 text-red-500 text-xl font-mono animate-pulse">
        BTC/USD 124,825.47 ▲ 0.31%
      </div>
    </section>
  );
};

export default Hero;
