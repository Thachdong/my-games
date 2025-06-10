/**
 * @description Timer component
 * @param {number} time - time in seconds
 * @param {boolean} isRunning - whether the timer is running, true: start countdown, false: stop countdown and reset timer
 * @param {function} callback - function to call when the timer is finished
 */
import moment from 'moment';
import React from 'react';

type TTimerProps = {
  time: number;
  isRunning: boolean;
  callback: () => void;
};

export const TurnTimer: React.FC<Readonly<TTimerProps>> = ({
  time,
  callback,
  isRunning,
}) => {
  const [timeLeft, setTimeLeft] = React.useState(time);
  const timerRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            callback();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setTimeLeft(time);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, time, callback]);

  const progress = (timeLeft / time) * 100;

  const formattedTime = moment.utc(timeLeft * 1000).format('mm:ss');

  return (
    <div className="w-full p-4">
      {/* count down */}
      <div
        className={`text-center text-2xl font-bold mb-2 ${
          progress <= 30 ? 'text-red-600' : ''
        }`}
      >
        {formattedTime}
      </div>

      {/* progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-1000 ${
            progress <= 30 ? 'bg-red-600' : 'bg-blue-600'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
