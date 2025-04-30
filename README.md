# ReactQuiz

A dynamic quiz application built with React that features timed questions, interactive feedback, and detailed result tracking.

## Features

- 🕒 Timed questions with visual progress bar
- 🎯 Interactive answer selection with immediate feedback
- 📊 Detailed statistics and performance tracking
- 💾 Local storage integration for answer persistence
- ⏭️ Skip option for difficult questions
- 🎨 Modern UI with smooth transitions and animations

## Technical Stack

- React 19
- Vite
- Modern JavaScript (ES6+)
- CSS3

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/quiz-app.git

# Navigate to project directory
cd quiz-app

# Install dependencies
npm install
```

### Running the Application

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Answer.jsx      # Individual answer component
│   ├── Header.jsx      # App header with logo
│   ├── ProgressBar.jsx # Timer progress indicator
│   ├── Question.jsx    # Question display
│   └── Summary.jsx     # Results summary
├── assets/             # Static assets
├── QuizData.js         # Quiz questions and answers
├── App.jsx             # Main application logic
└── index.css           # Global styles
```

## Application Flow

1. Question Display (10 seconds)
2. Answer Selection
3. Show Choice (2 seconds)
4. Show Result (3 seconds)
5. Next Question
6. Final Summary

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Development Notes

- The application uses timers for managing question flow (10s for questions, 2s for selection, 3s for results)
- Answer states are managed through local storage for persistence
- Custom styling with dynamic class assignments based on answer states
- Modular component structure for maintainability

## Future Improvements

- Add user authentication
- Implement multiple quiz categories
- Add difficulty levels
- Include a leaderboard system
- Support for multiple languages
