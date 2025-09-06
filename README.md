# Coin Toss App

A modern, interactive coin toss application with beautiful animations and a responsive design. This app allows users to flip a virtual coin, track statistics, and view flip history.

## Features

- **3D Coin Flip Animation**: Realistic 3D animation for coin flips
- **Statistics Tracking**: Keeps count of total flips, heads, and tails
- **Flip History**: Records the results of each flip with timestamps
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Works on desktop and mobile devices
- **Particle Effects**: Beautiful particle animations enhance the user experience
- **Sound Effects**: Audio feedback for coin flips
- **Cross-Browser Compatible**: Works in all modern browsers

## Technologies Used

- HTML5
- CSS3 (Animations, Flexbox, CSS Variables)
- JavaScript (ES6+)
- SVG Graphics

## How to Use

1. Open `index.html` in a web browser or host the files on a web server
2. Click the "Flip Coin" button to toss the coin
3. View statistics in the counter boxes
4. Check the history section to see previous flips
5. Use the theme toggle in the header to switch between light and dark modes
6. Click the "Reset" button to clear all statistics and history

## Project Structure

```
coin-toss-app/
├── css/
│   └── style.css          # Main stylesheet
├── images/
│   ├── favicon.svg        # App favicon
│   ├── heads.svg          # Heads side of coin
│   └── tails.svg          # Tails side of coin
├── js/
│   └── main.js            # Application logic
├── sounds/
│   ├── flip.mp3           # Sound for coin flip
│   └── coin.mp3           # Sound for coin landing
└── index.html             # Main HTML file
```

## Sound Credits

Please replace the placeholder sound files in the `sounds` directory with actual MP3 files. You can find free sound effects at:

- [Freesound](https://freesound.org/)
- [Mixkit](https://mixkit.co/free-sound-effects/)
- [ZapSplat](https://www.zapsplat.com/)

## Browser Compatibility

This app is compatible with all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

Polyfills are included for older browsers.

## Future Enhancements

- Add more coin designs
- Implement custom coin upload feature
- Add sharing capabilities
- Create a PWA version for offline use
- Add haptic feedback for mobile devices

## License

This project is open source and available for personal and commercial use.