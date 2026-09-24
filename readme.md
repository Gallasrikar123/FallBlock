# BlockFall 🧩

**BlockFall** is a classic, browser-based falling-block puzzle game created using fundamental web technologies (HTML5, CSS3, and modern JavaScript). The goal is simple: manipulate falling geometric shapes (tetrominoes) to clear complete horizontal rows and maximize your high score.

---

## 🌟 Features

* **Classic Puzzle Gameplay**: Move, rotate, soft drop, and hard drop 7 distinct block pieces.
* **Dynamic Scoring & Levels**: Gain points for every dropped piece and cleared line. As you clear more lines, the game level increases alongside the falling speed.
* **Next Block Preview**: Plan your strategy with a real-time preview of the upcoming block.
* **Score Persistence**: Keeps track of your best personal score using browser `localStorage`.
* **Mobile & Touch Friendly**: Built-in on-screen controls for easy playability on tablet and mobile devices.
* **Fully Responsive UI**: Clean, dark-themed UI built with flexbox and CSS grid that scales seamlessly across device sizes.

---

## 🎮 How to Play

### Controls

| Action | Keyboard Key | On-Screen Button |
| :--- | :--- | :--- |
| **Move Left** | `←` Left Arrow | `←` |
| **Move Right** | `→` Right Arrow | `→` |
| **Rotate** | `↑` Up Arrow | `↻` |
| **Soft Drop** | `↓` Down Arrow | `↓` |
| **Hard Drop** | `Spacebar` | — |
| **Pause / Resume** | Click Pause Button | `Ⅱ Pause` |

### Rules & Scoring
1. **Move & Rotate**: Position blocks as they fall from the top of the grid.
2. **Clear Lines**: Complete an entire horizontal line without empty spaces to clear it.
3. **Scoring Breakdown**:
   * **1 Line**: $100 \times \text{Level}$ points
   * **2 Lines**: $300 \times \text{Level}$ points
   * **3 Lines**: $500 \times \text{Level}$ points
   * **4 Lines (BlockFall)**: $800 \times \text{Level}$ points
   * **Soft Drop**: $+1$ point per grid step
   * **Hard Drop**: $+2$ points per grid step
4. **Game Over**: The game ends when new blocks can no longer enter the board.

---

## 📁 Project Structure

```text
├── index.html     # Landing page (Hero section, How to Play, Leaderboard, About)
├── game.html      # Game interface and canvas area
├── style.css      # Custom styling, dark theme, and responsive design layouts
└── script.js      # Game logic, rendering matrix, controls, and high score management
```

---

## 🚀 Getting Started

No external libraries, frameworks, or build tools are required to run this project!

1. **Clone or Download** this repository:
   ```bash
   git clone https://github.com/your-username/blockfall.git
   ```
2. **Open the project**:
   Navigate to the project directory and open `index.html` in any web browser.

---

## 🛠️ Technologies Used

* **HTML5**: Semantic elements and page layout.
* **CSS3**: CSS Grid, Flexbox, media queries for responsive layouts, and custom CSS variables/effects.
* **JavaScript (ES6+)**: DOM manipulation, interval timers, array manipulations for matrix collisions, and local storage.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).