import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { notifications } from "@/data/notifications";
import { Notification } from "@/types/notification";
import TeamRequestNotification from "./TeamRequestNotification";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PlayerNotification from "./PlayerNotification";
import {
  Avatar,
  AvatarGroup,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
} from "@mui/material";
import { getNotificationTitle, getTimeAgo } from "@/utils/general";
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";
import ProposalNotification from "./ProposalNotification";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function NotificationTabs() {
  const [value, setValue] = React.useState(0);

  const [filters, setFilters] = React.useState({
    notificationTypeFilter: "all",
    hasBeenReadFilter: "all",
    compactModeFilter: false,
  });

  const [currentNotification, setCurrentNotification] =
    React.useState<Notification | null>(null);

  const [limit, setLimit] = React.useState(3);

  const [allNotifications, setAllNotifications] = React.useState<
    Notification[] | null | "loading"
  >("loading");

  React.useEffect(() => {
    setAllNotifications(notifications);
    setCurrentNotification(notifications[0]);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    //@ts-expect-error - TS doesn't know that allNotifications is not null
    setCurrentNotification(allNotifications[newValue]);
  };

  const handleMarkAsReadUnread = () => {
    console.log("Marked as read", currentNotification);
    if (currentNotification) {
      const updatedNotifications = allNotifications
        ?.slice(0, limit)
        //@ts-expect-error - TS doesn't know that allNotifications is array
        .map((notification: Notification) => {
          if (notification.id === currentNotification.id) {
            return {
              ...notification,
              hasSeen: !notification.hasSeen,
            };
          }
          return notification;
        });
      setAllNotifications(updatedNotifications as Notification[]);
      setCurrentNotification({
        ...currentNotification,
        hasSeen: !currentNotification.hasSeen,
      });
    }
  };

  const applyFilters = () => {
    let filteredNotifications = notifications;
    if (filters.notificationTypeFilter !== "all") {
      filteredNotifications = filteredNotifications.filter(
        (notification) => notification.type === filters.notificationTypeFilter
      );
    }
    if (filters.hasBeenReadFilter !== "all") {
      filteredNotifications = filteredNotifications.filter(
        (notification) =>
          notification.hasSeen === (filters.hasBeenReadFilter === "read")
      );
    }

    setAllNotifications(filteredNotifications);
    setCurrentNotification(filteredNotifications[0]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        width: "100%",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
        spacing={1}
      >
        <Stack
          direction={"row"}
          justifyContent={"start"}
          alignItems={"center"}
          width={"100%"}
          spacing={2}
        >
          <Avatar
            sx={{
              width: 50,
              height: 50,
              backgroundColor: "primary.main",
            }}
            alt="Remy Sharp"
          >
            <Typography variant="h4">
              {allNotifications !== "loading"
                ? allNotifications?.filter(
                    (notification) => !notification.hasSeen
                  ).length
                : 0}
            </Typography>
          </Avatar>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="h5">Unread Notifications</Typography>
            <Typography variant="body1">
              Here you can see all your notifications
            </Typography>
          </Stack>
        </Stack>
        <Divider variant="fullWidth" />
        <Typography variant="h6">Filters:</Typography>
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 0 },
          }}
          direction="row"
          spacing={4}
        >
          <Button
            endIcon={
              currentNotification?.hasSeen ? <MailIcon /> : <DraftsIcon />
            }
            variant="contained"
            size="large"
            sx={{ fontWeight: "bold", fontSize: 16, p: 2.5, width: 200 }}
            color={currentNotification?.hasSeen ? "error" : "success"}
            onClick={handleMarkAsReadUnread}
          >
            Mark as {currentNotification?.hasSeen ? "Unread" : "Read"}
          </Button>
          <FormControl
            sx={{
              minWidth: 320,
            }}
          >
            <InputLabel id="demo-simple-select-label">
              Notification Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filters.notificationTypeFilter}
              label="Notification Type"
              onChange={(e) => {
                setFilters({
                  ...filters,
                  notificationTypeFilter: e.target.value as string,
                });
              }}
            >
              <MenuItem value={"all"}>All </MenuItem>
              <MenuItem value={"team_request"}>Team Request</MenuItem>
              <MenuItem value={"player_notification"}>
                Player Assignment
              </MenuItem>
              <MenuItem value={"proposal"}>Proposal</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              minWidth: 320,
            }}
          >
            <InputLabel id="demo-simple-select-label">Has been read</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filters.hasBeenReadFilter}
              label="Has Been Read"
              onChange={(e) => {
                setFilters({
                  ...filters,
                  hasBeenReadFilter: e.target.value as string,
                });
              }}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"read"}>Read</MenuItem>
              <MenuItem value={"unread"}>Unread</MenuItem>
            </Select>
          </FormControl>
          <Button
            endIcon={<FilterAltIcon />}
            variant="contained"
            size="large"
            sx={{ fontWeight: "bold", fontSize: 16, p: 2.5 }}
            color="success"
            onClick={applyFilters}
          >
            Filter
          </Button>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={filters.compactModeFilter}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      compactModeFilter: e.target.checked,
                    });
                  }}
                />
              }
              label={"Compact Mode"}
            />
          </FormGroup>
          <Typography
            sx={{
              display: { xs: "block", md: "none" },
            }}
            variant="caption"
            color="text.secondary"
          >
            Scroll horizontally to see all notifications
          </Typography>
        </Stack>
      </Stack>
      {allNotifications?.length == 0 ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">No Notifications Found</Typography>
        </Box>
      ) : allNotifications == "loading" ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={65} />
          <Typography mt={3} variant="h6">
            Loading Notifications...
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            height: "100%",
            marginTop: 4,
            width: { xs: "100%", md: "100vw" },
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              display: { xs: "none", md: "flex" },
            }}
          >
            {allNotifications
              ?.slice(0, limit)
              .map((notification: Notification, index: number) => {
                return (
                  <Tab
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "start",
                      width: 360,
                      height: filters.compactModeFilter ? 100 : 150,
                      background: notification.hasSeen ? "#fff" : "#fef6db",
                    }}
                    key={index}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "start",
                          width: 350,
                          height: 125,
                          mt: 2,
                        }}
                      >
                        <Stack
                          sx={{
                            display: filters.compactModeFilter
                              ? "none"
                              : "flex",
                          }}
                          direction={"row"}
                          spacing={0}
                        >
                          <AvatarGroup max={2}>
                            <Avatar
                              sx={{
                                width: 42,
                                height: 42,
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              alt={
                                notification.type === "team_request"
                                  ? notification.teamRequest?.teamName
                                  : notification.type === "player_notification"
                                  ? notification.player?.playerName
                                  : notification.type === "proposal"
                                  ? notification.proposal?.sentPlayerName
                                  : "Sender"
                              }
                              src={
                                notification.type === "team_request"
                                  ? notification.teamRequest?.teamLogo
                                  : notification.type === "player_notification"
                                  ? notification.player?.avatar
                                  : notification.type === "proposal"
                                  ? notification.proposal?.avatar
                                  : "Sender"
                              }
                            />
                            <Avatar
                              sx={{
                                width: 42,
                                height: 42,
                                backgroundColor:
                                  notification.type === "proposal"
                                    ? "transparent"
                                    : "primary.main",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              alt={
                                notification.type === "team_request"
                                  ? notification.teamRequest?.teamLogo
                                  : notification.type === "player_notification"
                                  ? notification.player?.avatar
                                  : notification.type === "proposal"
                                  ? notification.proposal?.avatar
                                  : "Sender"
                              }
                            >
                              {notification.type === "team_request" ? (
                                notification.teamRequest?.requestedPosition
                              ) : notification.type ===
                                "player_notification" ? (
                                <img
                                  style={{
                                    width: 42,
                                    height: 42,
                                  }}
                                  src={notification.player?.teamLogo}
                                />
                              ) : notification.type === "proposal" ? (
                                <img
                                  style={{
                                    width: 42,
                                    height: 42,
                                  }}
                                  src={notification.proposal?.offeredClubLogo}
                                />
                              ) : (
                                "Sender"
                              )}
                            </Avatar>
                          </AvatarGroup>
                        </Stack>
                        <Stack
                          sx={{
                            width: "90%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Stack textAlign={"start"} spacing={0}>
                            <Typography variant="h6">
                              {getNotificationTitle(notification)}
                            </Typography>
                            <Typography variant="body2">
                              {getTimeAgo(notification.createdAt)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    }
                    {...a11yProps(index)}
                  />
                );
              })}
            <Button
              sx={{ mt: 3 }}
              variant="contained"
              onClick={() => setLimit(limit + 3)}
              disabled={limit >= (allNotifications?.length as number)}
            >
              Load More - {limit}/{allNotifications?.length}
            </Button>
          </Tabs>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              width: "100%",
              borderRight: 1,
              borderColor: "divider",
              display: { xs: "flex", md: "none" },
            }}
          >
            {allNotifications
              ?.slice(0, limit)
              .map((notification: Notification, index: number) => {
                return (
                  <Tab
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "start",
                      width: 320,
                      height: filters.compactModeFilter ? 100 : 150,
                      background: notification.hasSeen ? "#fff" : "#fef6db",
                    }}
                    key={index}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "start",
                          width: 350,
                          height: 125,
                          mt: 2,
                        }}
                      >
                        <Stack
                          sx={{
                            display: filters.compactModeFilter
                              ? "none"
                              : "flex",
                          }}
                          direction={"row"}
                          spacing={0}
                        >
                          <AvatarGroup max={2}>
                            <Avatar
                              sx={{
                                width: 42,
                                height: 42,
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              alt={
                                notification.type === "team_request"
                                  ? notification.teamRequest?.teamName
                                  : notification.type === "player_notification"
                                  ? notification.player?.playerName
                                  : notification.type === "proposal"
                                  ? notification.proposal?.sentPlayerName
                                  : "Sender"
                              }
                              src={
                                notification.type === "team_request"
                                  ? notification.teamRequest?.teamLogo
                                  : notification.type === "player_notification"
                                  ? notification.player?.avatar
                                  : notification.type === "proposal"
                                  ? notification.proposal?.avatar
                                  : "Sender"
                              }
                            />
                            <Avatar
                              sx={{
                                width: 42,
                                height: 42,
                                backgroundColor:
                                  notification.type === "proposal"
                                    ? "transparent"
                                    : "primary.main",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              alt={
                                notification.type === "team_request"
                                  ? notification.teamRequest?.teamLogo
                                  : notification.type === "player_notification"
                                  ? notification.player?.avatar
                                  : notification.type === "proposal"
                                  ? notification.proposal?.avatar
                                  : "Sender"
                              }
                            >
                              {notification.type === "team_request" ? (
                                notification.teamRequest?.requestedPosition
                              ) : notification.type ===
                                "player_notification" ? (
                                <img
                                  style={{
                                    width: 42,
                                    height: 42,
                                  }}
                                  src={notification.player?.teamLogo}
                                />
                              ) : notification.type === "proposal" ? (
                                <img
                                  style={{
                                    width: 42,
                                    height: 42,
                                  }}
                                  src={notification.proposal?.offeredClubLogo}
                                />
                              ) : (
                                "Sender"
                              )}
                            </Avatar>
                          </AvatarGroup>
                        </Stack>
                        <Stack
                          sx={{
                            width: "90%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Stack textAlign={"start"} spacing={0}>
                            <div
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "17rem",
                              }}
                            >
                              <Typography noWrap variant="h6">
                                {getNotificationTitle(notification)}
                              </Typography>
                            </div>
                            <div
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "11rem",
                              }}
                            >
                              <Typography noWrap variant="body2">
                                {getTimeAgo(notification.createdAt)}
                              </Typography>
                            </div>
                          </Stack>
                        </Stack>
                      </Box>
                    }
                    {...a11yProps(index)}
                  />
                );
              })}
          </Tabs>
          {allNotifications
            ?.slice(0, limit)
            .map((notification: Notification, index: number) => {
              return (
                <>
                  <TabPanel value={value} index={index}>
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          md: "65vw",
                          lg: "70vw",
                          xl: "75vw",
                        },
                        height: { xs: "100%", md: 550, lg: 625, xl: 730 },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "start",
                        marginTop: 4,
                      }}
                    >
                      {notification.type === "team_request" ? (
                        <TeamRequestNotification notification={notification} />
                      ) : notification.type === "player_notification" ? (
                        <PlayerNotification notification={notification} />
                      ) : (
                        <ProposalNotification notification={notification} />
                      )}
                    </Box>
                  </TabPanel>
                </>
              );
            })}
        </Box>
      )}
    </Box>
  );
}
