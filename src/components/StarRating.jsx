import React, { useState } from 'react'
import PropTypes from "prop-types"
import Star from './Star'

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'

}

const starContainerStyle = {
    display: 'flex',
    gap: '4px'
}

StarRating.propTypes = {
    maxRating: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
    className: PropTypes.string,
    messages: PropTypes.array,
    defaultRating: PropTypes.number,
    onSetRating: PropTypes.func
}

export default function StarRating({
    maxRating = 5, 
    color="#E0B302", 
    size= 48,
    className = '',
    messages = [],
    defaultRating = 0,
    onSetRating,
}) {
   const [rating, setRating] = useState(defaultRating);
   const [tempRating, setTempRating] = useState(0);

   const handleRating = (rating) => {
    setRating(rating);
    onSetRating && onSetRating(rating);
   }
   
   const textStyle = {
    lineHeight: '1',
    margin: 0,
    color: color,
    fontSize: `${size / 1.5}px`
    }

//    console.log(tempRating);

  return (
    <div style={containerStyle} className={className}>
        <div style={starContainerStyle}>
            {Array.from({length: maxRating}, (_, i) => (
                <span key={i}>
                    <Star 
                    key={i} 
                    onRate={() => handleRating(i+1)} 
                    full={tempRating ? (i+1) <= tempRating : rating >= i + 1 ? true : false}
                    onHoverIn={() => setTempRating(i+1)}
                    onHoverOut={() => setTempRating(0)}
                    onTempRating={tempRating}
                    size={size}
                    color={color}
                    />
                </span>
            ))}
        </div>
        <p style={textStyle}>{messages.length === maxRating ? messages[tempRating ? tempRating - 1 : rating - 1] :tempRating || rating || ""}</p>
    </div>
  )
}
