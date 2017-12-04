import React from 'react';

export const DataBar = ({ display, total, graphWidth }) => {
  const dataPercentage = display / total;
  const dataWidth = graphWidth * dataPercentage;
  return (
    <div
      style={{
        width: `${dataWidth}px`,
        height: '5%',
        background: '#647089',
        border: '1px solid black',
        margin: '0 0 20px 0',
      }}
    >
      {display}
    </div>
  );
};
