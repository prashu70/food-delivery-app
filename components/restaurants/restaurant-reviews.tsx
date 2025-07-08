"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  date: string;
  comment: string;
}

interface RestaurantReviewsProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export default function RestaurantReviews({
  reviews,
  rating,
  reviewCount
}: RestaurantReviewsProps) {
  const [sortOption, setSortOption] = useState("newest");
  const [displayedReviews, setDisplayedReviews] = useState(reviews.slice(0, 5));
  const [hasMore, setHasMore] = useState(reviews.length > 5);

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]; // 5 stars, 4 stars, ..., 1 star
  reviews.forEach((review) => {
    ratingCounts[5 - review.rating]++;
  });
  
  const ratingPercentages = ratingCounts.map(count => (count / reviews.length) * 100);

  const loadMoreReviews = () => {
    const newDisplayedReviews = reviews.slice(0, displayedReviews.length + 5);
    setDisplayedReviews(newDisplayedReviews);
    
    if (newDisplayedReviews.length >= reviews.length) {
      setHasMore(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Overall Rating</h3>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold">{rating.toFixed(1)}</div>
            <div className="space-y-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(rating)
                        ? "fill-primary text-primary"
                        : "text-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Based on {reviewCount} reviews
              </div>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div key={star} className="flex items-center gap-2">
                <div className="w-8 text-sm">{star} star</div>
                <Progress value={ratingPercentages[index]} className="h-2 flex-1" />
                <div className="w-10 text-sm text-right">
                  {ratingCounts[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select
              value={sortOption}
              onValueChange={(value) => setSortOption(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          {displayedReviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg">
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.userImage} alt={review.userName} />
                    <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.userName}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(review.date), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-primary/10 text-primary rounded-full px-2 py-1 h-fit">
                  <Star className="h-3 w-3 fill-primary mr-1" />
                  <span className="text-xs font-medium">{review.rating}</span>
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={loadMoreReviews}>
              Load More Reviews
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}