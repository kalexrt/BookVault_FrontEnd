import { NotificationApi } from "../api/notification.api";
import { Toast } from "../utils/toast";

export class NotificationActions {
  // Function to handle the search for notifications
  static async handleSearch() {
    try {
      // Fetch notifications from the API
      const notifications = await NotificationApi.getNotifications();
      // Render the notifications
      NotificationActions.renderNotifications(notifications);
    } catch (err) {
      // Show error toast if fetching notifications fails
      Toast.showToast("Error occurred while getting notifications", "error");
    }
  }

  // Function to render notifications in the HTML
  static renderNotifications(
    notifications: { id: string; notification_text: string }[] // Notification id and notification_text only
  ) {
    const notificationTable = document.getElementById("notificationsTable");
    if (notifications.length === 0) {
      return; // Exit if there are no notifications
    }
    // Generate HTML for each notification
    const notificationHTML = notifications
      .map((notification: { id: string; notification_text: string }) => {
        return `
          <div class="notification flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0" data-id="${notification.id}">
              <p class="text-sm text-gray-700">${notification.notification_text}</p>
              <button 
                  class="mark-as-read text-gray-400 hover:text-blue-500 transition duration-300 ease-in-out"
                  aria-label="Mark as read"
                  data-id="${notification.id}"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
              </button>
          </div>
      `;
      })
      .join("");

    // Update the inner HTML of the notification table
    notificationTable!.innerHTML = notificationHTML;

    // Add event listener to mark a notification as read
    notificationTable!.addEventListener("click", (event: MouseEvent) => {
      const target = (event.target as Element).closest(
        ".mark-as-read"
      ) as HTMLElement | null;
      if (target) {
        const id = target.getAttribute("data-id");
        if (id) NotificationActions.markAsRead(id);
      }
    });
  }

  // Function to mark a notification as read
  static async markAsRead(notificationId: string) {
    try {
      // Mark the notification as read via the API
      await NotificationApi.markAsRead(notificationId);
      NotificationActions.handleSearch();
      Toast.showToast("Notification marked as read", "success");
    } catch (err) {
      Toast.showToast(
        "Error occurred while marking notification as read",
        "error"
      );
    }
  }
}
