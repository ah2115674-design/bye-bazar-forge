import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  count?: number;
}

const RatingStars = ({ rating, size = 18, showValue = false, count }: RatingStarsProps) => (
  <div className="flex items-center gap-1.5">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          style={{ width: size, height: size }}
          className={star <= Math.round(rating) ? "fill-primary text-primary" : "fill-muted text-muted"}
        />
      ))}
    </div>
    {showValue && <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>}
    {count !== undefined && (
      <span className="text-sm text-muted-foreground">({count.toLocaleString()} reviews)</span>
    )}
  </div>
);

export default RatingStars;
