import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

const SecretAdminTrigger = () => {
  const navigate = useNavigate();

  const [clickCount, setClickCount] = useState(0);
  const [spaceCount, setSpaceCount] = useState(0);
  const [triggered, setTriggered] = useState(false);

  // Track clicks
  useEffect(() => {
    const handleClick = () => {
      if (!triggered) {
        setClickCount((prev) => Math.min(prev + 1, 2));
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [triggered]);

  // Track space key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!triggered && e.code === "Space") {
        setSpaceCount((prev) => Math.min(prev + 1, 2));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggered]);

  // Secret + password check
  useEffect(() => {
    if (clickCount === 2 && spaceCount === 2 && !triggered) {
      setTriggered(true);

      const input = window.prompt("🔒 Enter admin password:");

      if (input && input.trim() === ADMIN_PASSWORD) {
        console.log("✅ Admin access granted");
        navigate("/admin", { replace: true });
      } else {
        alert("❌ Incorrect password");
        console.log("❌ Admin access denied");

        // reset
        setClickCount(0);
        setSpaceCount(0);
        setTriggered(false);
      }
    }
  }, [clickCount, spaceCount, triggered, navigate]);

  return null;
};

export default SecretAdminTrigger;
