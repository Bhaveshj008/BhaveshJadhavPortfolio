import React, { useState, useEffect } from 'react';

const TypedText = () => {
  // Define typed items
  const typedItems = ['Fullstack Developer', 'Web Developer', 'Programmer'];

  // State to hold the current item being typed, the index of the next letter to display, and whether backspacing is in progress
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [typedLetters, setTypedLetters] = useState('');
  const [backspacing, setBackspacing] = useState(false);

  // Effect to update the typed letters every 100 milliseconds
  useEffect(() => {
    let timeout;
    if (!backspacing && typedLetters.length < typedItems[currentItemIndex].length) {
      // Typing
      timeout = setTimeout(() => {
        setTypedLetters(typedItems[currentItemIndex].slice(0, typedLetters.length + 1));
      }, 100); // Adjust typing speed as needed
    } else if (!backspacing && typedLetters.length === typedItems[currentItemIndex].length) {
      // Pause before backspacing
      timeout = setTimeout(() => {
        setBackspacing(true);
      }, 2000); // Pause for 2 seconds before backspacing
    } else if (backspacing && typedLetters.length > 0) {
      // Backspacing
      timeout = setTimeout(() => {
        setTypedLetters(typedItems[currentItemIndex].slice(0, typedLetters.length - 1));
      }, 50); // Adjust backspacing speed as needed
    } else {
      // Move to the next item
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % typedItems.length);
      setBackspacing(false);
    }

    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, [typedItems, typedLetters, currentItemIndex, backspacing]);

  return (
    <p>
      I'm <span className="typed">{typedLetters}</span>
    </p>
  );
};

export default TypedText;
    
