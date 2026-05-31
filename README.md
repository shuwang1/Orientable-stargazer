# Orientable Stargazer

**Orientable Stargazer** is a high-fidelity GNSS Constellation Simulator and Visualizer. It features a modern, high-contrast "Cyber/Instrument" dashboard designed for real-time analysis of global navigation satellite systems.

![UI Preview](https://via.placeholder.com/800x400.png?text=Orientable+Stargazer+Dashboard+Preview) *(Placeholder for screenshot)*

---

## 🛰️ Key Features

### 1. Multi-Constellation Support
Comprehensive tracking and simulation for all major global and regional satellite systems:
*   **Global:** GPS, GLONASS, Galileo, BeiDou.
*   **Regional/Augmentation:** QZSS (Japan) and SBAS.

### 2. Hybrid Visualization Stage
*   **2D Tactical Map:** Leaflet-based dark mode map featuring glowing vector markers and a real-time day/night terminator.
*   **3D Interactive Globe:** A high-performance canvas-based globe for visualizing orbital geometry and global coverage.

### 3. Advanced Analysis Tools
*   **Real-time Skyplots:** Visualize satellite azimuth and elevation from your specific observer location.
*   **DOP Calculation:** Integrated engine for calculating Position Dilution of Precision (PDOP, HDOP, VDOP) to assess signal geometry quality.
*   **Satellite Count Tracking:** Dynamic charts showing visible satellite counts over time per constellation.

### 4. Modern Aesthetic
*   **Cyberpunk UI:** Built with a "glassmorphism" aesthetic, featuring semi-transparent panels and neon accents.
*   **Responsive Layout:** Draggable resizers for a customizable workspace.

---

## 🛠️ Technology Stack

*   **Mapping:** [Leaflet.js](https://leafletjs.com/) with Dark Matter tiles.
*   **Charts:** [Highcharts](https://www.highcharts.com/) for precision data visualization.
*   **Physics:** [satellite.js](https://github.com/shashwatak/satellite-js) for SGP4 orbital propagation.
*   **Math:** [Sylvester.js](http://sylvester.jcoglan.com/) for vector and matrix operations.
*   **Styling:** Vanilla CSS with Google Fonts (Orbitron & Outfit).

---

## 🚀 Getting Started

Please refer to [INSTALL.md](./INSTALL.md) for detailed instructions on how to set up and run the simulator locally.

---

## 📜 License

Copyright (c) 2026 Shu Wang. All rights reserved.  
Exceptions granted for personal and educational use. See [LICENSE.md](./LICENSE.md) for full terms.

---

## 🙏 Acknowledgments

This project is built upon the excellent work of the following communities:
*   **CelesTrak:** Providing the TLE (Two-Line Element) data source.
*   **Satellite.js / Highcharts / Sylvester.js:** Core engine components.

---
**Author:** Shu Wang  
**E-Mail:** [shuwang1@outlook.com](mailto:shuwang1@outlook.com)
