import { positionEmojis } from "@/data/positionEmojis";
import { Notification } from "@/types/notification";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PlayerNotificationProps {
  notification: Notification | any;
}

function PlayerNotification(props: PlayerNotificationProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "column",
        padding: 4,
        border: "1px solid #ccc",
        borderRadius: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Chip
        label={
          <Typography
            sx={{
              fontSize: { xs: "0.9rem", md: "1.3rem" },
            }}
            fontWeight={"bold"}
            variant="h6"
            gutterBottom
          >
            {props.notification.title}
          </Typography>
        }
        color="primary"
        sx={{
          borderRadius: 1,
        }}
      />
      <Typography mt={2} variant="body2" gutterBottom>
        Player <b>{props.notification.player?.playerName}</b> at{" "}
        <b>
          {props.notification.player?.currentTeam}(
          {props.notification.player?.currentTeamCountry})
        </b>{" "}
        is assigned to you
        <b>{props.notification.player?.requestedPosition}</b> player. You should
        to take a closer look at player&apos;s details
      </Typography>
      <Box sx={{ width: { xs: "100%", md: "60%" } }}>
        <Card
          sx={{
            padding: 3,
            width: "100%",
            border: `2px solid ${theme.palette.secondary.main}`,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <AvatarGroup
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: { xs: "column-reverse", md: "row" },
              }}
            >
              <Avatar
                sx={{
                  width: 200,
                  height: 200,
                  backgroundColor: "transparent",
                }}
                src={props.notification.player?.avatar}
                alt={props.notification.player?.avatar}
              />
              <Avatar
                sx={{
                  width: 200,
                  height: 200,
                  backgroundColor: "transparent",
                }}
                src={props.notification.player?.teamLogo}
                alt={props.notification.player?.teamName}
              />
            </AvatarGroup>
          </Box>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" component="div">
                  Personal
                </Typography>
                <Divider />
                <Typography variant="h6" component="div">
                  Fullname: {props.notification.player?.playerName}
                </Typography>
                <Typography variant="h6" component="div">
                  Nationality: {props.notification.player?.nationality}
                </Typography>
                <Typography variant="h6" component="div">
                  Height: {props.notification.player?.height} cm
                </Typography>
                <Typography variant="h6" component="div">
                  Age:{" "}
                  {new Date().getFullYear() -
                    new Date(
                      props.notification.player?.birthDate
                    ).getFullYear()}
                  {`(${new Date(
                    props.notification.player?.birthDate
                  ).toLocaleDateString("en-US")})`}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" component="div">
                  In-Pitch
                </Typography>
                <Divider />
                <Typography variant="h6" component="div">
                  Position: {props.notification.player?.position} -{" "}
                  {/* @ts-expect-error - emoji */}
                  {positionEmojis[props.notification.player?.position] || "⚽️"}
                </Typography>
                <Typography variant="h6" component="div">
                  Team: {props.notification.player?.currentTeam} (
                  {props.notification.player?.currentTeamCountry})
                </Typography>
                <Typography variant="h6" component="div">
                  Requested At:{" "}
                  {new Date(props.notification.createdAt).toLocaleDateString(
                    "en-US"
                  )}
                </Typography>
                <Typography variant="h6" component="div">
                  Uniform Number: #{props.notification.player?.uniformNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" component="div">
                  Stats
                </Typography>
                <Divider />
                <Typography variant="h6" component="div">
                  Appearances: {props.notification.player?.appearances} 🏃‍♂️
                </Typography>
                <Typography variant="h6" component="div">
                  Goals: {props.notification.player?.goals} ⚽️
                </Typography>
                <Typography variant="h6" component="div">
                  Assists:
                  {props.notification.player?.assists} 🎯
                </Typography>
                <Typography variant="h6" component="div">
                  Time On Field:{" "}
                  {props.notification.player?.timeOnField > 1000
                    ? props.notification.player?.timeOnField.toLocaleString()
                    : props.notification.player?.timeOnField}
                  {"' "}
                  ⏱️
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-around",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Button
              fullWidth
              endIcon={<ArrowForwardIcon />}
              variant="contained"
              size="medium"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              Show Interest
            </Button>
            <Button
              fullWidth
              endIcon={
                <img
                  width="22"
                  height="22"
                  src="/icons/icons8-football-club-24.png"
                  alt="external-football-soccer-tulpahn-basic-outline-tulpahn-5"
                />
              }
              variant="contained"
              size="medium"
              sx={{ fontWeight: "bold" }}
              color="secondary"
            >
              View Team
            </Button>
            <Button
              fullWidth
              endIcon={
                <img
                  width="22"
                  height="22"
                  src="/icons/icons8-football-player-24.png"
                  alt="external-football-soccer-tulpahn-basic-outline-tulpahn-5"
                />
              }
              variant="contained"
              size="medium"
              sx={{ fontWeight: "bold" }}
              color="error"
            >
              View Player
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}

export default PlayerNotification;
