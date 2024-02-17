import { FC } from "react";
import ReactStars from "react-rating-stars-component";

interface RatingProps {
  value: number;
  size?: number;
  edit?: boolean;
  props?: any;
  onChange?: (value: number) => void;
}

const Rating: FC<RatingProps> = ({ edit = false, value = 0, size = 26, onChange, props }) => {
  const ratingChanged = (value: number) => {
    onChange?.(value);
  };
  return (
    <ReactStars
      {...props}
      count={5}
      value={value}
      edit={edit}
      onChange={ratingChanged}
      size={size}
      activeColor="#ffd700"
    />
  );
};

export default Rating;
