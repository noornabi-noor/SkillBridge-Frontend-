'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'

export default function NotFound() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - window.innerWidth / 2)
      y.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <div className="scene">
      {/* Stars */}
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />

      {/* Floating planets */}
      <div className="planet planet1" />
      <div className="planet planet2" />

      <motion.div
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="glass"
      >
        <motion.h1
          animate={{ textShadow: ['0 0 20px #00ffff', '0 0 40px #ff00ff', '0 0 20px #00ffff'] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          404
        </motion.h1>

        <h2>You’re Lost in Space</h2>
        <p>The page drifted into another universe.</p>

        <Link href="/">
          <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
            🚀 Take Me Home
          </motion.button>
        </Link>
      </motion.div>

      <style jsx>{`
        .scene {
          height: 100vh;
          overflow: hidden;
          background: radial-gradient(circle at bottom, #020111 0%, #000000 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          color: white;
        }

        .glass {
          z-index: 10;
          padding: 4rem 5rem;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          box-shadow: 0 0 80px rgba(0, 255, 255, 0.25);
          text-align: center;
          transform-style: preserve-3d;
        }

        h1 {
          font-size: 8rem;
          margin: 0;
          background: linear-gradient(90deg, #00ffff, #ff00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        h2 {
          font-size: 2rem;
          margin-top: 0.5rem;
        }

        p {
          opacity: 0.8;
          margin: 1rem 0 2.5rem;
        }

        button {
          padding: 14px 34px;
          border-radius: 40px;
          border: none;
          background: linear-gradient(90deg, #00ffff, #ff00ff);
          color: black;
          font-weight: bold;
          cursor: pointer;
          font-size: 1rem;
        }

        /* Planets */
        .planet {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          animation: float 10s ease-in-out infinite;
        }

        .planet1 {
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, #ff00ff, #6a00ff);
          top: 15%;
          left: 10%;
        }

        .planet2 {
          width: 160px;
          height: 160px;
          background: radial-gradient(circle, #00ffff, #0066ff);
          bottom: 15%;
          right: 12%;
          animation-delay: 3s;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-40px); }
          100% { transform: translateY(0); }
        }

        /* Star layers */
        .stars, .stars2, .stars3 {
          position: absolute;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          animation: moveStars 60s linear infinite;
        }

        .stars {
          background-image: radial-gradient(1px 1px at 20px 30px, white, transparent);
          opacity: 0.3;
        }

        .stars2 {
          background-image: radial-gradient(1px 1px at 100px 150px, white, transparent);
          animation-duration: 120s;
          opacity: 0.2;
        }

        .stars3 {
          background-image: radial-gradient(2px 2px at 200px 250px, white, transparent);
          animation-duration: 180s;
          opacity: 0.15;
        }

        @keyframes moveStars {
          from { transform: translateY(0); }
          to { transform: translateY(-2000px); }
        }
      `}</style>
    </div>
  )
}
