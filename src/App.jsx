import './App.css';
import React, { useState } from "react";
import { Timer } from "./Components/Timer/Timer";
import {interval} from 'rxjs'

function App() {
  const initialTime = {
    seconds: 0,
    minutes: 0,
    hours: 0,
  };

  let clicCounter = 0;
  
  const [time, setTime] = useState(initialTime);
  const [isCount, setCountingStatus] = useState(false);

  let initiatedSeconds = time.seconds;
  let initiatedMinutes = time.minutes;
  let initiatedHours = time.hours;

  const start = () => {
    if (initiatedSeconds === 60) {
      initiatedMinutes++;
      initiatedSeconds = 0;
    }

    if (initiatedMinutes === 60) {
      initiatedHours++;
      initiatedMinutes = 0;
    }

    if (initiatedHours === 24) {
      initiatedHours = 0;
    }

    setTime({
      seconds: initiatedSeconds,
      minutes: initiatedMinutes,
      hours: initiatedHours,
    });

    initiatedSeconds++;
  };

  const startCounting = () => {
    start();
    setCountingStatus(true);
    const newInterval = interval(1000);
    const stream$ = newInterval.subscribe(start)

    document.getElementById('stop').addEventListener('click', () => {
      stream$.unsubscribe();
      console.log('res')
    })

    document.getElementById('reset').addEventListener('click', () => {
      stream$.unsubscribe();
      console.log('res')
    })

    document.getElementById('wait').addEventListener('click', () => {
      clicCounter++;
      if (clicCounter === 1) {
        setTimeout(() => clicCounter = 0, 300);
      }
  
      if (clicCounter === 2) {
        stream$.unsubscribe() 
        clicCounter = 0;
      }
    })
  }

  const stopCounting = () => {
    setTime({ ...initialTime });
    setCountingStatus(false);
  };

  const waitCounting = () => {
    clicCounter++;

    if (clicCounter === 1) {
      setTimeout(() => clicCounter = 0, 300);
    }

    if (clicCounter === 2) {
      setCountingStatus(false);

      clicCounter = 0;
    }
  };

  const resetCounting = () => {
    stopCounting();

    initiatedSeconds = 0;
    initiatedMinutes = 0;
    initiatedHours = 0;

    startCounting();
  }

  return (
    <div className="Watch">
      <h1>Stopwatch</h1>
      <Timer time={time} />
      <div className="Watch__buttons">
        <button
          type="button"
          onClick={startCounting}
          className="Watch__button"
          disabled={isCount}
        >
          Start
        </button>
        <button
          type="button"
          onClick={stopCounting}
          className="Watch__button"
          id='stop'
        >
          Stop
        </button>
        <button
          type="button"
          onClick={waitCounting}
          className="Watch__button"
          id='wait'
        >
          Wait
        </button>
        <button
          type="button"
          onClick={resetCounting}
          className="Watch__button"
          id='reset'
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default App;
