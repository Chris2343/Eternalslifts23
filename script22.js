
// Load previous reviews from local storage
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

// Display previous reviews
function displayReviews() {
  const reviewsList = document.querySelector(".reviews-list");
  reviewsList.innerHTML = "";

  if (reviews.length === 0) {
    reviewsList.innerHTML = "<p>No reviews yet.</p>";
    return;
  }

  reviews.forEach((review) => {
    const reviewDiv = document.createElement("div");
    reviewDiv.innerHTML = `
      <p>Rating: ${review.rating} stars</p>
      <p>Feedback: ${review.feedback}</p>
      <hr>
    `;
    reviewsList.appendChild(reviewDiv);
  });
}

// Function to handle rating
function rate(stars) {
  const ratingStars = document.querySelectorAll(".rating-star");

  for (let i = 0; i < ratingStars.length; i++) {
    if (i < stars) {
      ratingStars[i].style.color = "gold";
    } else {
      ratingStars[i].style.color = "black";
    }
  }

  // Store the rating in local storage
  localStorage.setItem("rating", stars);
}

// Function to handle review submission
function submitReview() {
  const ratingValue = localStorage.getItem("rating");
  const feedbackValue = localStorage.getItem("feedback");

  if (!ratingValue || !feedbackValue) {
    alert("Please provide a rating and feedback before submitting.");
    return;
  }

  const review = {
    rating: ratingValue,
    feedback: feedbackValue,
  };

  // Add the new review to the reviews array
  reviews.push(review);

  // Store the reviews in local storage
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // Clear the rating and feedback
  localStorage.removeItem("rating");
  localStorage.removeItem("feedback");

  // Display the reviews
  displayReviews();
}

// Load previous feedback and rating from local storage
window.onload = function () {
  const feedbackInput = document.querySelector(".feedback-input");
  const ratingStars = document.querySelectorAll(".rating-star");

  // Load feedback
  const storedFeedback = localStorage.getItem("feedback");
  if (storedFeedback) {
    feedbackInput.value = storedFeedback;
  }

  // Load rating
  const storedRating = localStorage.getItem("rating");
  if (storedRating) {
    const ratingValue = parseInt(storedRating);
    for (let i = 0; i < ratingValue; i++) {
      ratingStars[i].style.color = "gold";
    }
  }

  // Display previous reviews
  displayReviews();
}
