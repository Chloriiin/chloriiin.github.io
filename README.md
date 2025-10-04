# Personal Website

A modern personal website built with React and TypeScript, featuring an Apple-style liquid glass navigation bar.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Modern responsive design with TypeScript
- **Liquid Glass Navigation**: iOS 26-style glass effect using CSS and SVG filters
- Hill animation with GSAP and normal distribution curves
- Smooth animations and interactions
- Project showcase with masonry layout
- Real-time clock display

## Dependencies

### Liquid Glass Effect
This project uses a custom implementation based on [archisvaze/liquid-glass](https://github.com/archisvaze/liquid-glass):
- **Repository**: [archisvaze/liquid-glass](https://github.com/archisvaze/liquid-glass)
- **Implementation**: Pure CSS and SVG filters for authentic Apple iOS 26 liquid glass effect
- **Features**: 
  - Inner shadow with customizable blur, spread & color
  - Glass tint with RGB color and opacity control
  - Frost blur using backdrop-filter
  - Noise distortion via SVG fractal turbulence
  - Hardware-accelerated rendering

### Animation Libraries
- **GSAP**: For smooth hill animation with mouse tracking
- **CSS backdrop-filter**: Native browser glass physics simulation
- **SVG Filters**: For noise distortion and glass displacement effects

### Browser Support
- **Tested on**: Chromium-based browsers (Chrome, Edge, etc.)
- **Limited support**: Safari and Firefox (due to backdrop-filter and SVG filter variations)
