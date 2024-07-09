# hydroponIQ.

## Overview
A web application for managing the status of modules in a hydroponics system, running on randomly generated data provided as part of a recruitment task.

## Features
- __Overview__ of all modules in the system (`/`)
  - Real-time updates of system readings, utilizing Socket.IO
  - Ability to __add__ new modules
- __Detailed view__ of a single module (`/module/:id`)
  - __Visual representation__ of module status
  - Historical data __graph__ of system readings
  - Ability to __edit__ module details
- __Search__ for modules by their name
- __Responsive design__ for mobile, desktop and tablets.
- State managed by [__Zustand__](https://zustand-demo.pmnd.rs/)

## Technologies
Project is created with:
- __React__ version: 18.3, bootstrapped with Vite 5.3
- __Node.js__ version: 20.12
- __Tailwind CSS__ version: 3.4
- __TypeScript__ version: 5.2.2

## Dependencies
Node.js (built with v20.12) and running backend API server provided for the recruitment task.

## Pages
### `/` - Overview of all modules
![Dahboard photo](/public/dash.jpg)

Displays all modules in the system, with their current availability status, target temperature and recent reading bar updated in real-time. Allows for adding new modules.

### `/module/:id` - Detailed view of a single module
![Dahboard photo](/public/module.jpg)

Displays information about a single module. __Left section__ shows a Grafana-esque gauge, current reading overview, and some other randomized attributes.

__Right section__ shows a line graph of system readings, with the ability to select a desired date(time) range. Realtime updates are stored in the app state, and can also be viewed in the graph, with safe zone specified in task description ($\pm 0.5 \degree C$).
_This section can be seen even if the module is not available, user should be allowed to see historical data at all times._

## Setup
Clone the repository and install dependencies:
```bash
git clone https://github.com/bSienkiewicz/recruitment-luna.git
cd recruitment-luna
npm install
```
Create a `.env` or `.env.development` file in the root directory with the following content:
```env
VITE_BASE_URL=#URL_TO_API_SERVER:PORT
```
Run the application:
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`.

## Testing
Tests are written using Vitest and React Testing Library. To run the tests, use:
```bash
npm run test
```
To run tests with UI:
```bash
npm run test:ui
```
The tests cover the following areas:
- __Overview__ page
- __Detailed view__ page
- __UI__ components
- __API__ requests
- __Hooks__ and __Utilities__

## License
MIT
