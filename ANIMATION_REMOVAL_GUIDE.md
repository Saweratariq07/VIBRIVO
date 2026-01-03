# Animation Removal Strategy for Homepage.tsx

## Changes Required:

### 1. Import Statement (Line 7)
REMOVE: `import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';`

### 2. Remove Hook Usage (Lines 48-60)
REMOVE:
- `const { scrollYProgress } = useScroll();`
- `const productsInView = useInView(productsRef, { once: false });`
- `const testimonialsInView = useInView(testimonialsRef, { once: false });`
- `const sustainabilityInView = useInView(sustainabilityRef, { once: false });`
- `const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);`
- `const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);`

### 3. Replace All motion Components:
- `motion.div` → `div`
- `motion.button` → `button`
- `motion.h1` → `h1`
- `motion.p` → `p`
- `motion.span` → `span`
- `<AnimatePresence>` → `<>` (React Fragment)
- `</AnimatePresence>` → `</>`

### 4. Remove All Animation Props:
- `initial={...}`
- `animate={...}`
- `exit={...}`
- `whileHover={...}`
- `whileTap={...}`
- `whileInView={...}`
- `transition={...}`
- `viewport={...}`
- `style={{ y: heroY, opacity: heroOpacity }}`

### 5. Conditional Rendering Changes:
Replace `AnimatePresence` wrapped conditional rendering with simple conditional rendering using `&&`
