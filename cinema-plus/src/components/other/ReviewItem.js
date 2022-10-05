import React from "react";
import { v4 } from "uuid";
import { ReadMore } from "./ReadMore";

const ReviewItem = ({ review }) => {
  const starsTotal = 5;
  const { rating } = review?.author_details;
  const dateReview = review?.created_at?.slice(0, 10);
  const stars = Math.round(rating / 2);
  const timeReview = new Date(String(dateReview));
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        `${Math.floor(interval) === 1 ? " year ago" : " years ago"}`
      );
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        `${Math.floor(interval) === 1 ? " month ago" : " months ago"}`
      );
    }
    interval = seconds / 604800;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        `${Math.floor(interval) === 1 ? " week ago" : " weeks ago"}`
      );
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        `${Math.floor(interval) === 1 ? " day ago" : " days ago"}`
      );
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        `${Math.floor(interval) === 1 ? " hour ago" : " hours ago"}`
      );
    }
    interval = seconds / 60;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        `${Math.floor(interval) === 1 ? " minute ago" : " minutes ago"}`
      );
    }
    return (
      Math.floor(seconds) +
      `${Math.floor(interval) === 1 ? " second ago" : " seconds ago"}`
    );
  }
  return (
    <div className="flex items-center gap-x-5 comment max-w-[570px]">
      <img
        src={"../user.png"}
        alt=""
        className="w-[70px] h-[70px] object-cover rounded-full"
      />
      <div className="w-full content">
        <div className="review-content-inner">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg review-athor text-blueLight">
              {review.author}
            </h2>
            <div className="flex items-center stars-vote gap-x-1">
              {stars > 0 &&
                Array(stars)
                  .fill(0)
                  .map(() => {
                    return (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        // #6680c0 #525252
                        className={`fill-[#6680c0]`}
                        xmlns="http://www.w3.org/2000/svg"
                        key={v4()}
                      >
                        <path
                          d="M12.0312 1C13.0666 1 14.6926 5.69969 15.2795 7.50668C15.4141 7.92126 15.7943 8.20684 16.23 8.22162C18.1151 8.28556 23 8.55772 23 9.66144C23 10.7495 19.5188 13.4853 18.0955 14.5583C17.7427 14.8243 17.5982 15.2836 17.734 15.704C18.3132 17.4975 19.7048 22.1483 18.8117 22.8815C17.9323 23.6034 14.1749 20.7486 12.6485 19.5286C12.2692 19.2254 11.7305 19.2251 11.3511 19.528C9.82346 20.7477 6.06764 23.6035 5.25065 22.8815C4.41962 22.1471 5.73815 17.4816 6.28237 15.6949C6.40915 15.2786 6.26319 14.8287 5.91569 14.5668C4.4996 13.4997 1 10.7523 1 9.66144C1 8.55659 5.89498 8.285 7.77586 8.22142C8.20861 8.2068 8.58723 7.92462 8.72415 7.51385C9.32468 5.71216 10.9944 1 12.0312 1Z"
                          stroke="#6680c0"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    );
                  })}
              {stars > 0 &&
                stars < starsTotal &&
                Array(starsTotal - stars)
                  .fill(0)
                  .map(() => {
                    return (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        // #6680c0 #525252
                        className={`fill-[#525252]`}
                        xmlns="http://www.w3.org/2000/svg"
                        key={v4()}
                      >
                        <path
                          d="M12.0312 1C13.0666 1 14.6926 5.69969 15.2795 7.50668C15.4141 7.92126 15.7943 8.20684 16.23 8.22162C18.1151 8.28556 23 8.55772 23 9.66144C23 10.7495 19.5188 13.4853 18.0955 14.5583C17.7427 14.8243 17.5982 15.2836 17.734 15.704C18.3132 17.4975 19.7048 22.1483 18.8117 22.8815C17.9323 23.6034 14.1749 20.7486 12.6485 19.5286C12.2692 19.2254 11.7305 19.2251 11.3511 19.528C9.82346 20.7477 6.06764 23.6035 5.25065 22.8815C4.41962 22.1471 5.73815 17.4816 6.28237 15.6949C6.40915 15.2786 6.26319 14.8287 5.91569 14.5668C4.4996 13.4997 1 10.7523 1 9.66144C1 8.55659 5.89498 8.285 7.77586 8.22142C8.20861 8.2068 8.58723 7.92462 8.72415 7.51385C9.32468 5.71216 10.9944 1 12.0312 1Z"
                          stroke="#525252"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    );
                  })}
            </div>
          </div>
          <ReadMore numberText="150">{review.content}</ReadMore>
          <p className="mt-2 text-right">{timeSince(timeReview)}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
