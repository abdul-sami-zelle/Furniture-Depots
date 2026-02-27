'use client'

import { useEffect } from "react";


// Production Apis
export const roomApi = ``
export const url = `https://fdapi.thefurnituredepots.com`;
export const siteUrl = ``



export const truncateTitle = (title, maxLength) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
};

export const transformReviewData = (reviews) => {
  const result = [
    { count: 5, rev: 0 },
    { count: 4, rev: 0 },
    { count: 3, rev: 0 },
    { count: 2, rev: 0 },
    { count: 1, rev: 0 }
  ];

  // Loop through the reviews and count occurrences for each rating
  reviews?.forEach((review) => {
    if (review?.rating >= 1 && review?.rating <= 5) {
      // Find the matching count object based on rating and increment rev count
      result.forEach((item) => {
        if (item?.count === review.rating) {
          item.rev += 1;
        }
      });
    }
  });


  return result;
};

export const extractImagesFromReviews = (reviews) => {
  // Flatten the images from all reviews into a single array
  return reviews
    .map(review => review.images) // Extract the images field
    .flat() // Flatten the array of arrays into a single array
    .filter(image => image); // Ensure that empty values are removed
};

export async function getLatLngFromAddress(address, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== "OK") {
      throw new Error(`Geocoding error: ${data.status}`);
    }

    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error("Error fetching latitude and longitude:", error);
    return null;
  }
}

export function openLink(link) {
  
  if (typeof window !== 'undefined' && link) {
    window.location.href = link;
  } else {
    console.error("No link provided or window is not available!");
  }
}

export const getCurrentDay = (dateStr, local) => {
  let date = new Date(dateStr);
  return date.toLocaleDateString(local, { weekday: 'long' })
}

export function getCurrentTimeForNewYork() {
  const timeZone = "America/New_York";
  let currentTime = new Date().toLocaleString("en-US", { timeZone, hour12: false });
  return currentTime;
}

export async function getGoogleStoreDetails(placeId) {

  const baseUrl = `https://fm.skyhub.pk/api/v1/stores/get-google-store-details`;
  const url = `${baseUrl}?place_id=${encodeURIComponent(placeId)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

export const formatPhoneNumber = (value) => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, "").slice(0, 10); // Keep only the first 10 digits

  // Apply formatting progressively as user types
  if (cleaned.length > 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length > 3) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length > 0) {
    return `(${cleaned}`;
  }

  return "";
};

export const useDisableBodyScroll = (...states) => {
  useEffect(() => {
    const shouldDisableScroll = states.some(state => state);
    document.documentElement.style.overflow = shouldDisableScroll ? "hidden" : "auto";
    document.body.style.overflow = shouldDisableScroll ? "hidden" : "auto";
  }, [...states]);
};

export const capitalize = (str) => {
  return str
    .split("_") // Split by underscore
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join words back
};

export const getDeliveryDate = () => {
  const options = { weekday: "long", month: "short", day: "numeric" };
  const today = new Date();

  const optionWithTimeZone = { ...options, timeZone: "America/New_York" };

  today.setDate(today.getDate() + 3);
  return today.toLocaleDateString("en-us", optionWithTimeZone);
}

export const calculateDiscountPercentage = (sale_price, regular_price) => {
  // Check if sale_price is null, empty, or undefined
  if (!sale_price) {
    return "0%";
  }

  // Convert to numbers
  const sale = parseFloat(sale_price);
  const regular = parseFloat(regular_price);

  // Validate numbers
  if (isNaN(sale) || isNaN(regular) || regular <= 0 || sale > regular) {
    return "0%";
  }

  // Calculate discount percentage and round off
  const discount = Math.round(((regular - sale) / regular) * 100);
  return `-${discount}%`;
};

export function getOptionNames(attributes) {
  if (!Array.isArray(attributes)) return [];

  return attributes.flatMap(attr =>
    Array.isArray(attr.options)
      ? attr.options.map(option => option.name)
      : []
  );
}

export  function formatDate(dateString, includeTime = false) {
  if (!dateString) return '';

  const date = new Date(dateString);

  const pad = (n) => (n < 10 ? '0' + n : n);

  const month = pad(date.getMonth() + 1); // Months are 0-indexed
  const day = pad(date.getDate());
  const year = date.getFullYear();

  let formattedDate = `${month}-${day}-${year}`;

  if (includeTime) {
    let hours = date.getHours();
    const minutes = pad(date.getMinutes());
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12

    formattedDate += ` ${pad(hours)}:${minutes} ${ampm}`;
  }

  return formattedDate;
}

export function getAdjustedPrice(value) {
  // Convert value to number first
  const numericValue = Number(value);

  if (isNaN(numericValue)) {
    return 0; // Fallback for invalid input
  }

  if (numericValue < 1000) {
    return Math.round(numericValue / 25);
  } else {
    return Math.round(numericValue / 26);
  }
}