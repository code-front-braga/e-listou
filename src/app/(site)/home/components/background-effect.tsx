'use client';

import { motion } from 'motion/react';

export function BackgroundEffect() {
  return (
    <motion.div
			initial={{ opacity: 1 }}
			animate={{ opacity: 0.6 }}
			transition={{ duration: 1.2, delay: 2.8, ease: 'anticipate' }}
			className="bg-christalle absolute inset-0 z-0"
		/>
  )
}