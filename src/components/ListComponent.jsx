import React from 'react';

export default function ListComponent({ elements = [] }) {
  return (
    <div className='listWrapper'>
      {elements.map(({ name, id, imageUrl }) => (
        <div key={`pokemon-${id}`} className='element'>
          {imageUrl && <img src={imageUrl} alt={name} />}
          <span>{`${name} - ${id}`}</span>
        </div>
      ))}
    </div>
  );
}
