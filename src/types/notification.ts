type NotificationType = "team_request" | "player_notification" | "proposal";

type NotificationStatus = "pending" | "accepted" | "rejected";

type Position =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "CDM"
  | "CM"
  | "LM"
  | "RM"
  | "LW"
  | "RW"
  | "ST";

interface BaseNotification {
  id: number;
  title: string;
  type: NotificationType;
  fromId: number;
  toId: number;
  status: NotificationStatus;
  hasSeen: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TeamRequestNotification extends BaseNotification {
  type: "team_request";
  teamRequest: {
    teamId: number;
    teamName: string;
    teamLogo: string;
    country: string;
    division: string;
    requestedPosition: Position;
    financials: [number, number];
  };
}

interface PlayerNotification extends BaseNotification {
  type: "player_notification";
  player: {
    playerId: number;
    playerName: string;
    avatar: string;
    uniformNumber: number;
    birthDate: string;
    appearances: number;
    timeOnField: number;
    height: number;
    goals: number;
    assists: number;
    currentTeam: string;
    position: Position;
    nationality: string;
    currentTeamCountry: string;
    teamLogo: string;
  };
}

interface ProposalNotification extends BaseNotification {
  type: "proposal";
  proposal: {
    sentPlayerId: number;
    sentPlayerName: string;
    senderClubId: number;
    avatar: string;
    senderClubLogo: string;
    senderClubName: string;
    proposedSalary: string;
  };
}

export type Notification =
  | TeamRequestNotification
  | PlayerNotification
  | ProposalNotification;
