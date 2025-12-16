// Formate price in formate $199.00
export const formatePrice = (price) => {
    return new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
    }).format(price)
}

// Split date and month in to like this 31 MAR
export function getDatePart(dateString, type) {
    const date = new Date(dateString);
    const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
    ];

    if (type === "date") {
        return date.getDate(); // returns only day (1–31)
    } else if (type === "month") {
        return months[date.getMonth()]; // returns short month name
    } else {
        return {
            date: date.getDate(),
            month: months[date.getMonth()],
        };
    }
}

// Formate Time
export function formatTime(stateName, timestamp) {
  const stateTimeZones = {
    "Pennsylvania": "America/New_York",
  };

  const timeZone = stateTimeZones[stateName];
  if (!timeZone) {
    return "Invalid state name or unsupported time zone.";
  }

  const date = new Date(timestamp);
  const now = new Date();

  // Adjust the date to the state's time zone
  const options = { timeZone, hour: "2-digit", minute: "2-digit", hour12: false };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedTime = formatter.format(date);

  // Calculate the difference in seconds
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 172800) {
    return "Yesterday";
  } else {
    return `Date: ${date.toLocaleDateString("en-US", { timeZone })}, Time: ${formattedTime}`;
  }
}

// Dynamic GET Request Function
export const getRequestProcess = async (url, options = {}) => {
  try {
    const { headers = {}, token = null, ...restOptions } = options;

    // If token exists, attach it to Authorization header
    const finalHeaders = {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(url, {
      method: 'GET',
      headers: finalHeaders,
      ...restOptions, // any other fetch options
    });

    // Return full response, not just data
    return response;
  } catch (error) {
    console.error('GET request error:', error);
    throw error; // propagate error
  }
};
