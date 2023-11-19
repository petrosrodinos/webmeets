import { FC } from 'react';
import ReactStars from 'react-rating-stars-component';

interface RatingProps {
  edit?: boolean;
  value: number;
  onChange?: (value: number) => void;
}

const Rating: FC<RatingProps> = ({ edit = false, value = 0, onChange }) => {
  const ratingChanged = (value: number) => {
    onChange?.(value);
  };
  return <ReactStars count={5} value={value} edit={edit} onChange={ratingChanged} size={26} activeColor="#ffd700" />;
};

export default Rating;
