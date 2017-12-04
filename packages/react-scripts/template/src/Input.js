import React, { Component } from 'react';

export const Input = props => {
  let removeButton;
  const addButton = <button onClick={props.addInput}> + </button>;

  const onChange = e => {
    const value = e.target.value;
    props.onChange(value, props.index);
  };

  const removeOnClick = () => {
    if (props.shouldClear) {
      props.clearState();
    } else {
      props.removeInput(props.index);
    }
  };

  if (!props.value) {
    removeButton = null;
  } else {
    removeButton = <button onClick={removeOnClick}> - </button>;
  }

  return (
    <div>
      <input
        value={props.value ? props.value : ''}
        type="text"
        placeholder="Search"
        onChange={onChange}
      />
      {props.showAdd ? addButton : null}
      {removeButton}
    </div>
  );
};
