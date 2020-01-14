import serviceConfig from '../service-config';

/**
 * Returns true if the sidebar tutorial has to be shown to a user for a given session.
 * @deprecated To be removed once preact help/tutorial panel is in place
 */
export function shouldShowSidebarTutorial(sessionState) {
  if (sessionState.preferences.show_sidebar_tutorial) {
    return true;
  }
  return false;
}

/**
 * The following things must all be true for the tutorial component to auto-display
 * on app launch:
 * - The app must be operating within the "sidebar" (i.e. not single-annotation
 *   or stream mode); AND
 * - No configuration is present in `settings.services` indicating
 *   that the host wants to handle its own help requests (i.e. no event handler
 *   is provided to intercept the default help panel), AND
 * - A user profile is loaded in the current state that indicates a `true` value
 *   for the `show_sidebar_tutorial` preference (i.e. the tutorial has not been
 *   dismissed by this user yet). This implies the presence of a profile, which
 *   in turn implies that there is an authenticated user.
 *
 * @param {boolean} isSidebar - is the app currently displayed in a sidebar?
 * @param {Object} sessionState - `session` state from the store
 * @param {Object} settings - app configuration/settings
 * @return {boolean} - Tutorial panel should be displayed automatically
 */
export function shouldAutoDisplayTutorial(isSidebar, sessionState, settings) {
  const shouldShowBasedOnProfile =
    typeof sessionState.preferences === 'object' &&
    !!sessionState.preferences.show_sidebar_tutorial;
  const service = serviceConfig(settings) || {};
  return (
    isSidebar && !service.onHelpRequestProvided && shouldShowBasedOnProfile
  );
}
