"use client"

import React, { useState, useEffect } from "react";

const TypewriterEffect = ({ words }: any) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    if (!isWaiting) {
      const typeTimeout = setTimeout(() => {
        if (isDeleting) {
          setText(currentWord.substring(0, text.length - 1));
          setTypingSpeed(100);
        } else {
          setText(currentWord.substring(0, text.length + 1));
        }

        if (!isDeleting && text === currentWord) {
          setIsWaiting(true);
          setTimeout(() => setIsDeleting(true), 2000);
        }

        if (isDeleting && text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, typingSpeed);

      return () => clearTimeout(typeTimeout);
    } else {
      const waitingTimeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, 2000);

      return () => clearTimeout(waitingTimeout);
    }
  }, [text, isDeleting, wordIndex, isWaiting, typingSpeed]);

  return <span className="font-[400]">{text}</span>;
};

export default TypewriterEffect;