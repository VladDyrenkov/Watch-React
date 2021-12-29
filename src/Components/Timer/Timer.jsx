import React from "react";

export const Timer = ({ time }) => (
  <h1 className="Timer">
    {time.hours < 10 ? '0' + time.hours : time.hours}
    :
    {time.minutes < 10 ? '0' + time.minutes : time.minutes}
    :
    {time.seconds < 10 ? '0' + time.seconds : time.seconds}
  </h1>
);
