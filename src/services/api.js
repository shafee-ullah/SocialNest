import { getAuth } from "firebase/auth";

const BASE_URL = "http://localhost:5000";

const getHeaders = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (user) {
    try {
      const token = await user.getIdToken(true);
      headers["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error getting token:", error);
      // Force reload if token refresh fails
      window.location.href = "/auth/login";
      throw new Error("Authentication failed. Please log in again.");
    }
  }

  return headers;
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const text = await response.text();
    let error;
    try {
      const json = JSON.parse(text);
      error = json.error || "An error occurred";
    } catch {
      error = text || "An error occurred";
    }

    if (response.status === 401 || response.status === 403) {
      // Force reload on auth errors
      window.location.href = "/auth/login";
      throw new Error("Authentication failed. Please log in again.");
    }

    throw new Error(error);
  }

  // Handle empty responses
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing response:", error);
    throw new Error("Invalid response from server");
  }
};

// Posts API
export const getUpcomingEvents = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/events${queryParams ? `?${queryParams}` : ""}`;

    const headers = await getHeaders();
    console.log("Fetching posts with headers:", headers);

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
export const getManageEvents = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/manage/events/${
      queryParams ? `?${queryParams}` : ""
    }`;

    const headers = await getHeaders();
    console.log("Fetching posts with headers:", headers);

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getJoinedEvents = async () => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/events/joined`, {
      method: "GET",
      headers: headers,
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching joined events:", error);
    throw error;
  }
};

export const getEvent = async (id) => {
  if (!id) {
    throw new Error("Event ID is required");
  }

  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/events/${id}`, {
      method: "GET",
      headers: headers,
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const joinEvent = async (eventId) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/events/${eventId}/join`, {
      method: "POST",
      headers: headers,
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error joining event:", error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(eventData),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/events/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(eventData),
    });

    const result = await handleResponse(response);
    if (result === null) {
      // If the response is empty but successful, return the updated event data
      return eventData;
    }
    return result;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(postData),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: headers,
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/events/${id}`, {
      method: "DELETE",
      headers: headers,
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

// User API
export const createOrUpdateUser = async (userData) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: headers,

      body: JSON.stringify(userData),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getUser = async (email) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/users/${email}`, {
      method: "GET",
      headers: headers,
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
