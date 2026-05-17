/**
 * Vercel Speed Insights initialization for static HTML site
 * 
 * This script initializes Vercel Speed Insights to track web vitals
 * and performance metrics for the site.
 */

import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights
// This will automatically track page views and web vitals
injectSpeedInsights({
  debug: false, // Set to true for debugging in development
});
