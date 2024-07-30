/**
 * Author : Nikita Davies
 */
import * as api from "./utils";

/**
 * Get details of a event
 */
export async function getEventId(id) {
    try {
      const response = await api.get(`/events/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

/**
 * Create event
 */
export async function createEvent(payload) {
  try {
    const response = await api.post(`/events`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete event
 */
export async function deleteEvent(id) {
    try {
      const response = await api.del(`/events/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
