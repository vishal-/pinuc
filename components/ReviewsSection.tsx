import { Provider } from "@/data/providers";

interface ReviewsSectionProps {
  provider: Provider;
}

export function ReviewsSection({ provider }: ReviewsSectionProps) {
  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      author: "Priya Singh",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent service! Very professional and punctual. Highly recommended."
    },
    {
      id: 2,
      author: "Rajesh Kumar",
      rating: 4,
      date: "1 month ago",
      comment: "Good work and reasonable pricing. Will use again."
    },
    {
      id: 3,
      author: "Neha Patel",
      rating: 5,
      date: "1 month ago",
      comment:
        "Outstanding work quality. The provider was very courteous and efficient."
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        Reviews ({provider.reviewCount})
      </h2>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl text-yellow-400">★</span>
          <span className="text-xl font-bold">{provider.rating}</span>
          <span className="text-gray-600">out of 5</span>
        </div>
        <p className="text-sm text-gray-600">
          Based on {provider.reviewCount} customer reviews
        </p>
      </div>

      <div className="space-y-4">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold">{review.author}</p>
                <p className="text-sm text-gray-600">{review.date}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
