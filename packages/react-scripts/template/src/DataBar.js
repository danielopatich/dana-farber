import React, { Component } from 'react';

export const DataBar = ({ display, total, graphWidth }) => {
  const dataPercentage = display / total;
  const dataWidth = graphWidth * dataPercentage;
  return (
    <div
      style={{
        width: `${dataWidth}px`,
        height: '20px',
        background: 'pink',
        margin: '10px 0px',
      }}
    />
  );
};
