
// app/components/CountdownTimer.tsx

'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  Days: number;
  Hours: number;
  Minutes: number;
  Seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  /**
   * Calculates the time left until the target date.
   * Returns an object with Days, Hours, Minutes, and Seconds.
   */
  const calculateTimeLeft = (): Partial<TimeLeft> => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: Partial<TimeLeft> = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / (1000 * 60)) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // State to hold the remaining time
  const [timeLeft, setTimeLeft] = useState<Partial<TimeLeft>>(calculateTimeLeft());

  // State to determine if the countdown has ended
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      // If no time is left, stop the timer
      if (Object.keys(updatedTimeLeft).length === 0) {
        setIsTimeUp(true);
        clearInterval(timer);
      }
    }, 1000);

    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  // If the countdown has ended, display a message
  if (isTimeUp) {
    return <div className="text-center text-2xl font-semibold">We're Live!</div>;
  }

  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-semibold mb-4">Join Our Waiting List</h2>
      <div className="flex justify-center gap-4">
        {Object.entries(timeLeft)
          .filter(([_, value]) => typeof value === 'number') // Ensure value is a number
          .map(([interval, value]) => (
            <div key={interval} className="flex flex-col items-center">
              <span className="text-4xl font-bold">{value}</span>
              <span className="text-sm">{interval}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
