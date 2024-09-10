import { Notification } from "@/types/notification";

export const notifications: Notification[] = [
  {
    id: 1,
    title: "Team Request: Right Wing Player Needed",
    type: "team_request",
    fromId: 101,
    toId: 202,
    status: "pending",
    hasSeen: false,
    createdAt: "2024-09-10T09:00:00Z",
    updatedAt: "2024-09-10T09:00:00Z",
    teamRequest: {
      teamId: 1,
      teamName: "Fenerbahçe",
      teamLogo:
        "https://upload.wikimedia.org/wikipedia/tr/8/86/Fenerbah%C3%A7e_SK.png",
      country: "Turkey",
      division: "Süper Lig",
      requestedPosition: "RM",
      financials: [5000000, 10000000],
    },
  },
  {
    id: 2,
    title: "Player Assignment: Check Player Details",
    type: "player_notification",
    fromId: 102,
    toId: 202,
    status: "pending",
    hasSeen: false,
    createdAt: "2024-09-10T09:30:00Z",
    updatedAt: "2024-09-10T09:30:00Z",
    player: {
      playerId: 10,
      playerName: "Lionel Messi",
      avatar:
        "https://img.a.transfermarkt.technology/portrait/big/28003-1710080339.jpg?lm=1",
      birthDate: "1987-06-24T09:00:00Z",
      nationality: "Argentina",
      appearances: 904,
      timeOnField: 74292,
      goals: 735,
      assists: 355,
      height: 170,
      uniformNumber: 10,
      position: "RW",
      currentTeam: "Inter Miami",
      currentTeamCountry: "USA",
      teamLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Inter_Miami_CF_logo.svg/800px-Inter_Miami_CF_logo.svg.png",
    },
  },
  {
    id: 3,
    title: "Proposal: Player Offered to Club",
    type: "proposal",
    fromId: 103,
    toId: 202,
    status: "pending",
    hasSeen: false,
    createdAt: "2024-09-10T10:00:00Z",
    updatedAt: "2024-09-10T10:00:00Z",
    proposal: {
      sentPlayerId: 11,
      sentPlayerName: "Kylian Mbappé",
      avatar:
        "https://img.a.transfermarkt.technology/portrait/big/342229-1682683695.jpg?lm=1",
      senderClubId: 3,
      senderClubName: "PSG",
      senderClubLogo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcJ-yH2jQACwlL4bxsHuta1gawqUQoAUTC_g&s",
      proposedSalary: "€25M per year",
    },
  },
];
