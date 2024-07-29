import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Rating = ({ rating, onRatingChange }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 4; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => onRatingChange(i)}
        >
          <FontAwesomeIcon
            icon={faStar}
            size={40}
            color={i <= rating ? 'gold' : 'gray'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: 'row' ,backgroundColor:'transparent',Width:'100%'}}>
      {renderStars()}
    </View>
  );
};

export default Rating;
