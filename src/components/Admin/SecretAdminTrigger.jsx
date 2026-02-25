import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

// Required sequence: click, click, space, space, enter
const REQUIRED_SEQUENCE = ['click', 'click', 'space', 'space', 'enter'];
const SEQUENCE_TIMEOUT = 5000; // Reset sequence after 5 seconds of inactivity

const SecretAdminTrigger = () => {
  const navigate = useNavigate();
  const [sequence, setSequence] = useState([]);
  const [triggered, setTriggered] = useState(false);
  const timeoutRef = useRef(null);
  const triggeredRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    triggeredRef.current = triggered;
  }, [triggered]);

  // Reset sequence after timeout
  const resetSequence = useCallback(() => {
    setSequence([]);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Add event to sequence and check if it matches
  const addToSequence = useCallback((event) => {
    if (triggeredRef.current) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSequence((prev) => {
      const newSequence = [...prev, event];
      
      // Check if current sequence matches the required sequence so far
      const isValid = newSequence.every((item, index) => item === REQUIRED_SEQUENCE[index]);
      
      if (!isValid) {
        // Wrong input, reset sequence
        return [];
      }
      
      // Set timeout to reset sequence if no more input
      timeoutRef.current = setTimeout(resetSequence, SEQUENCE_TIMEOUT);
      
      return newSequence;
    });
  }, [resetSequence]);

  // Handle clicks
  useEffect(() => {
    const handleClick = (e) => {
      // Ignore clicks on input fields, buttons, links, etc.
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        return;
      }
      addToSequence('click');
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [addToSequence]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in an input field
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault(); // Prevent page scroll
        addToSequence('space');
      } else if (e.code === "Enter") {
        addToSequence('enter');
      } else {
        // Any other key resets the sequence
        resetSequence();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addToSequence, resetSequence]);

  // Check if sequence is complete
  useEffect(() => {
    if (sequence.length === REQUIRED_SEQUENCE.length && !triggered) {
      const isComplete = sequence.every((item, index) => item === REQUIRED_SEQUENCE[index]);
      
      if (isComplete) {
        setTriggered(true);
        resetSequence();

        const input = window.prompt("🔒 Enter admin password:");

        if (input && input.trim() === ADMIN_PASSWORD) {
          console.log("✅ Admin access granted");
          navigate("/admin", { replace: true });
        } else {
          alert("❌ Incorrect password");
          console.log("❌ Admin access denied");
          setTriggered(false);
        }
      }
    }
  }, [sequence, triggered, navigate, resetSequence]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return null;
};

export default SecretAdminTrigger;
