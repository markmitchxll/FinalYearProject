/**
 * NotificationService — schedules local push notifications for pet care reminders.
 *
 * The Tamagotchi pet needs regular attention, so this service schedules
 * notifications to remind the user to check on their pet or go stargazing.
 *
 * Notification types:
 * - "Your pet is hungry!" — scheduled 8 hours after last feeding.
 * - "Your pet misses the stars!" — scheduled if no discoveries in 24 hours.
 * - "Clear skies tonight — perfect for stargazing!" — evening reminder (customisable time).
 *
 * Uses @notifee/react-native or @react-native-community/push-notification-ios.
 *
 * Exported functions:
 *
 * requestPermission()
 *   Requests notification permission from the OS.
 *
 * schedulePetHungryNotification(hoursFromNow)
 *   Schedules a "pet is hungry" notification.
 *
 * scheduleStargazingReminder(hour, minute)
 *   Schedules a daily evening stargazing reminder at the given time.
 *
 * cancelAllNotifications()
 *   Cancels all pending notifications (e.g. when user disables reminders).
 */

export async function requestPermission() {
  // TODO: Request notification permissions.
}

export function schedulePetHungryNotification(hoursFromNow) {
  // TODO: Schedule a local notification hoursFromNow hours in the future.
}

export function scheduleStargazingReminder(hour, minute) {
  // TODO: Schedule a daily repeating notification at the given time.
}

export function cancelAllNotifications() {
  // TODO: Cancel all scheduled notifications.
}
