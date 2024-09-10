import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Avatar,
  AvatarGroup,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tooltip,
} from "@mui/material";

//!Icons
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { notifications } from "@/data/notifications";
import { Notification } from "@/types/notification";
import { getNotificationTitle, getTimeAgo } from "@/utils/general";
import TeamRequestNotification from "./TeamRequestNotification";
import PlayerNotification from "./PlayerNotification";

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        width: "100%",
        height: "80vh",
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
            }}
            alt="Remy Sharp"
          >
            <Typography variant="h4">5</Typography>
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
          }}
          direction="row"
          spacing={4}
        >
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
              value={null}
              label="Notification Type"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
              value={null}
              label="Notification Type"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
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
              value={null}
              label="Notification Type"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel control={<Switch />} label={"Compact Mode"} />
          </FormGroup>
        </Stack>
      </Stack>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100%",
          marginTop: 4,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {notifications.map((notification: Notification, index: number) => {
            return (
              <Tab
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                  width: 300,
                  height: 145,
                }}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "start",
                      width: 300,
                      height: 125,
                      mt: 2,
                    }}
                  >
                    {/* AvatarGroup representing players/clubs */}
                    <AvatarGroup max={2}>
                      <Avatar
                        sx={{
                          width: 42,
                          height: 42,
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
                          backgroundColor: "#FFD700",
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
                        ) : notification.type === "player_notification" ? (
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
                            src={notification.proposal?.senderClubLogo}
                          />
                        ) : (
                          "Sender"
                        )}
                      </Avatar>
                    </AvatarGroup>

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

                      <Tooltip title="Mark as read" arrow placement="top">
                        <IconButton
                          color="secondary"
                          //   onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <MarkEmailReadIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                }
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
        {notifications.map((notification: Notification, index: number) => {
          return (
            <TabPanel key={index} value={value} index={index}>
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
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {notification.type === "team_request" ? (
                  <TeamRequestNotification notification={notification} />
                ) : notification.type === "player_notification" ? (
                  <PlayerNotification notification={notification} />
                ) : (
                  <Typography variant="h4">Proposal Notification</Typography>
                )}
              </Box>
            </TabPanel>
          );
        })}
      </Box>
    </Box>
  );
}
