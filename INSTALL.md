# Installation and Usage Guide

This project is a web-based GNSS/Satellite simulation tool. Since it uses asynchronous data fetching (AJAX/Fetch), it must be served through a web server to function correctly.

## Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari, etc.)
- A local web server (Python, Node.js, etc.)

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Orientable-stargazer
```

### 2. Run a Local Web Server
You can use any local web server. Here are a few common options:

#### Option A: Python 3 (Recommended)
If you have Python installed, run:
```bash
python3 -m http.server 8000
```

#### Option B: Node.js (npx)
If you have Node.js installed, you can use `http-server` without installing it:
```bash
npx http-server -p 8000
```

#### Option C: PHP
```bash
php -S localhost:8000
```

### 3. Access the Application
Open your web browser and navigate to:
```
http://localhost:8000
```

## Quick Usage Guide

Once the application is running:

1.  **Select a Location:** Use the **Location Preset** dropdown in the sidebar to jump to major cities, or manually enter Latitude/Longitude.
2.  **Adjust Time:** Set the simulation start time using the date picker.
3.  **Configure Mask:** Set the **Elevation Mask** (in degrees) to filter out satellites blocked by the horizon or obstacles.
4.  **Recalculate:** Click the **RECALCULATE** button to update the simulation.
5.  **Analyze:** 
    *   Toggle between **2D Map** and **3D Globe** views.
    *   Scroll down the sidebar to view the **DOP Values** and **Visible Satellites** breakdown.
    *   Inspect the **Skyplot** and **Visible Count** charts at the bottom.

## Troubleshooting

- **Data not loading:** Ensure you are running a web server. Opening `index.html` directly from the file system (`file:///.../index.html`) will likely cause CORS (Cross-Origin Resource Sharing) errors when the application tries to fetch the TLE data files.
- **Missing Icons:** Ensure the `orientable_stargazer/icon` directory is present and matches the paths in the application.
- **Browser Compatibility:** Use a modern browser that supports ES6 features and the Fetch API.
