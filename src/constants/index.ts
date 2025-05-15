/*
 * Application info
 */
export const APP_NAME = "H5Radar";
export const APP_DESCRIPTION = "No terra incognita!";
export const APP_VERSION = "0.0.1";

/*
 * Endpoints settings
 */
export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8080";

/*
 * Feature toggles
 */
export const BILLING_ENABLED = import.meta.env.VITE_BIILLIG_ENABLED || "false";
export const NOTIFICATIONS_ENABLED = import.meta.env.VITE_NOTIFICATIONS_ENABLED || "false";

/*
 * Settings
 */
export const DEBOUNCE_TIME = 400;
