export function getNotificationTitle(notification) {
  switch (notification.type) {
    case "team_request":
      return `${notification.teamRequest?.teamName} is looking for a ${notification.teamRequest?.requestedPosition}`;
    case "player_notification":
      return `${notification.player?.playerName} has been assigned to you`;
    case "proposal":
      return `Proposal: ${notification.proposal?.sentPlayerName} to ${notification.proposal?.offeredClubName}`;
    default:
      return "Notification";
  }
}

export function getTimeAgo(createdAt) {
  const currentTime = new Date();
  const createdAtTime = new Date(createdAt);
  const timeDifference = currentTime - createdAtTime;
  const seconds = timeDifference / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = months / 12;

  if (years >= 1) {
    return `${Math.floor(years)} years ago`;
  } else if (months >= 1) {
    return `${Math.floor(months)} months ago`;
  } else if (days >= 1) {
    return `${Math.floor(days)} days ago`;
  } else if (hours >= 1) {
    return `${Math.floor(hours)} hours ago`;
  } else if (minutes >= 1) {
    return `${Math.floor(minutes)} minutes ago`;
  } else {
    return `${Math.floor(seconds)} seconds ago`;
  }

  return `${createdAt}`;
}
