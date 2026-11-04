import { ParkStatusConfig, TrailRoute, EcoEvent, GalleryItem } from '../types';
import {
  INITIAL_PARK_STATUS,
  INITIAL_EVENTS,
  INITIAL_TRAILS,
  INITIAL_GALLERY,
} from '../data/initialSeedData';

const STORAGE_KEYS = {
  PARK_STATUS: 'kalitalang_park_status_v1',
  EVENTS: 'kalitalang_events_v1',
  TRAILS: 'kalitalang_trails_v1',
  GALLERY: 'kalitalang_gallery_v1',
  AUTH: 'kalitalang_admin_auth_v1',
};

// Helper function to simulate network delay for VPS-Ready Service Layer
const delay = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Format any Google Form link to safe embed URL with `embedded=true`
 */
export function formatGoogleFormUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();

  // If already has embedded=true
  if (trimmed.includes('embedded=true')) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes('google.com') && url.pathname.includes('/forms/')) {
      // If path ends with /edit or has no /viewform, adjust to viewform
      if (!url.pathname.endsWith('/viewform')) {
        url.pathname = url.pathname.replace(/\/edit.*$/, '') + '/viewform';
      }
      url.searchParams.set('embedded', 'true');
      return url.toString();
    }
  } catch {
    // If not a standard URL, append query parameter if resembles viewform
    if (trimmed.includes('viewform')) {
      return trimmed.includes('?') ? `${trimmed}&embedded=true` : `${trimmed}?embedded=true`;
    }
  }

  return trimmed;
}

// ==========================================
// PARK STATUS SERVICES
// ==========================================
export async function getParkStatus(): Promise<ParkStatusConfig> {
  await delay();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PARK_STATUS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PARK_STATUS, JSON.stringify(INITIAL_PARK_STATUS));
      return INITIAL_PARK_STATUS;
    }
    return JSON.parse(raw) as ParkStatusConfig;
  } catch (e) {
    console.error('Error reading park status from storage:', e);
    return INITIAL_PARK_STATUS;
  }
}

export async function updateParkStatus(
  payload: Partial<ParkStatusConfig>
): Promise<ParkStatusConfig> {
  await delay();
  const current = await getParkStatus();
  const updated: ParkStatusConfig = {
    ...current,
    ...payload,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.PARK_STATUS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('kalitalang_data_updated', { detail: { type: 'park_status' } }));
  return updated;
}

// ==========================================
// EVENTS SERVICES
// ==========================================
export async function getEvents(): Promise<EcoEvent[]> {
  await delay();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    }
    return JSON.parse(raw) as EcoEvent[];
  } catch (e) {
    console.error('Error reading events from storage:', e);
    return INITIAL_EVENTS;
  }
}

export async function getEventBySlug(slug: string): Promise<EcoEvent | null> {
  const events = await getEvents();
  return events.find((evt) => evt.slug === slug || evt.id === slug) || null;
}

export async function getFeaturedEvent(): Promise<EcoEvent | null> {
  const events = await getEvents();
  const featured = events.find((e) => e.isFeatured);
  return featured || events[0] || null;
}

export async function saveEvent(event: EcoEvent): Promise<EcoEvent> {
  await delay();
  const events = await getEvents();
  
  // Format the google form url automatically
  const formattedEvent: EcoEvent = {
    ...event,
    googleFormUrl: formatGoogleFormUrl(event.googleFormUrl),
  };

  // If this event is marked as featured, un-feature other events
  let updatedEvents: EcoEvent[];
  if (formattedEvent.isFeatured) {
    updatedEvents = events.map((e) => ({ ...e, isFeatured: false }));
  } else {
    updatedEvents = [...events];
  }

  const existingIndex = updatedEvents.findIndex((e) => e.id === formattedEvent.id);
  if (existingIndex >= 0) {
    updatedEvents[existingIndex] = formattedEvent;
  } else {
    updatedEvents.unshift(formattedEvent);
  }

  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(updatedEvents));
  window.dispatchEvent(new CustomEvent('kalitalang_data_updated', { detail: { type: 'events' } }));
  return formattedEvent;
}

export async function deleteEvent(id: string): Promise<boolean> {
  await delay();
  const events = await getEvents();
  const filtered = events.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(filtered));
  window.dispatchEvent(new CustomEvent('kalitalang_data_updated', { detail: { type: 'events' } }));
  return true;
}

// ==========================================
// TRAILS SERVICES
// ==========================================
export async function getTrails(): Promise<TrailRoute[]> {
  await delay();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRAILS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TRAILS, JSON.stringify(INITIAL_TRAILS));
      return INITIAL_TRAILS;
    }
    return JSON.parse(raw) as TrailRoute[];
  } catch (e) {
    console.error('Error reading trails from storage:', e);
    return INITIAL_TRAILS;
  }
}

export async function getTrailBySlug(slug: string): Promise<TrailRoute | null> {
  const trails = await getTrails();
  return trails.find((t) => t.slug === slug || t.id === slug) || null;
}

export async function saveTrail(trail: TrailRoute): Promise<TrailRoute> {
  await delay();
  const trails = await getTrails();
  const existingIndex = trails.findIndex((t) => t.id === trail.id);

  let updatedTrails: TrailRoute[];
  if (existingIndex >= 0) {
    updatedTrails = [...trails];
    updatedTrails[existingIndex] = trail;
  } else {
    updatedTrails = [trail, ...trails];
  }

  localStorage.setItem(STORAGE_KEYS.TRAILS, JSON.stringify(updatedTrails));
  window.dispatchEvent(new CustomEvent('kalitalang_data_updated', { detail: { type: 'trails' } }));
  return trail;
}

export async function deleteTrail(id: string): Promise<boolean> {
  await delay();
  const trails = await getTrails();
  const filtered = trails.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEYS.TRAILS, JSON.stringify(filtered));
  window.dispatchEvent(new CustomEvent('kalitalang_data_updated', { detail: { type: 'trails' } }));
  return true;
}

// ==========================================
// GALLERY SERVICES
// ==========================================
export async function getGallery(): Promise<GalleryItem[]> {
  await delay();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
      return INITIAL_GALLERY;
    }
    return JSON.parse(raw) as GalleryItem[];
  } catch (e) {
    console.error('Error reading gallery from storage:', e);
    return INITIAL_GALLERY;
  }
}

export async function saveGalleryItem(item: GalleryItem): Promise<GalleryItem> {
  await delay();
  const items = await getGallery();
  const existingIndex = items.findIndex((g) => g.id === item.id);

  let updatedItems: GalleryItem[];
  if (existingIndex >= 0) {
    updatedItems = [...items];
    updatedItems[existingIndex] = item;
  } else {
    updatedItems = [item, ...items];
  }

  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updatedItems));
  window.dispatchEvent(new CustomEvent('kalitalang_data_updated', { detail: { type: 'gallery' } }));
  return item;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  await delay();
  const items = await getGallery();
  const filtered = items.filter((g) => g.id !== id);
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(filtered));
  window.dispatchEvent(new CustomEvent('kalitalang_data_updated', { detail: { type: 'gallery' } }));
  return true;
}

// ==========================================
// SEED RESET & AUTH UTILITIES
// ==========================================
export async function resetAllDataToSeed(): Promise<void> {
  await delay(120);
  localStorage.setItem(STORAGE_KEYS.PARK_STATUS, JSON.stringify(INITIAL_PARK_STATUS));
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
  localStorage.setItem(STORAGE_KEYS.TRAILS, JSON.stringify(INITIAL_TRAILS));
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
  window.dispatchEvent(new CustomEvent('kalitalang_data_updated', { detail: { type: 'all' } }));
}

export function getAdminAuthSession(): boolean {
  return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
}

export function setAdminAuthSession(isAuthenticated: boolean): void {
  if (isAuthenticated) {
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
}

