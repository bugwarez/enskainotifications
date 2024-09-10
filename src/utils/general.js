export function getNotificationTitle(notification) {
  switch (notification.type) {
    case "team_request":
      return `${notification.teamRequest?.teamName} is looking for a ${notification.teamRequest?.requestedPosition}`;
    case "player_notification":
      return `${notification.player?.playerName} has been assigned to you`;
    case "proposal":
      return `Proposal: ${notification.proposal?.sentPlayerName} to ${notification.proposal?.senderClubName}`;
    default:
      return "Notification";
  }
}

export function getTimeAgo(createdAt) {
  const diffInMinutes = Math.floor((new Date() - new Date(createdAt)) / 60000);
  return `${diffInMinutes} minutes ago`;
}
