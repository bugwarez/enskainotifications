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
  CardMedia,
  Chip,
  Divider,
  Grid,
  Grid2,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

interface PlayerNotificationProps {
  notification: Notification;
}

function PlayerNotification(props: PlayerNotificationProps) {
  const eur = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });
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
          <Typography fontWeight={"bold"} variant="h6" gutterBottom>
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
        is assigned to you <b>{props.notification.player?.requestedPosition}</b>{" "}
        player. You should to take a closer look at player&apos;s details
      </Typography>
      <Box sx={{ width: "60%" }}>
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
            <Grid2 container spacing={4}>
              <Grid2 item xs={12}>
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
                  ).toLocaleDateString()})`}
                </Typography>
              </Grid2>
              <Grid2 item xs={12}>
                <Typography variant="h5" component="div">
                  In-Pitch
                </Typography>
                <Divider />
                <Typography variant="h6" component="div">
                  Position: {props.notification.player?.position} -{" "}
                  {positionEmojis[props.notification.player?.position] || "⚽️"}
                </Typography>
                <Typography variant="h6" component="div">
                  Team: {props.notification.player?.currentTeam} (
                  {props.notification.player?.currentTeamCountry})
                </Typography>
                <Typography variant="h6" component="div">
                  Requested At:{" "}
                  {new Date(props.notification.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" component="div">
                  Uniform Number: #{props.notification.player?.uniformNumber}
                </Typography>
              </Grid2>
              <Grid2 item xs={12}>
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
                  {
                    //show the number as digits if its more than 1000
                    props.notification.player?.timeOnField > 1000
                      ? props.notification.player?.timeOnField.toLocaleString()
                      : props.notification.player?.timeOnField
                  }
                  {"' "}
                  ⏱️
                </Typography>
              </Grid2>
            </Grid2>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="medium"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              Show Interest
            </Button>
            <Button
              variant="contained"
              size="medium"
              sx={{ fontWeight: "bold" }}
              color="secondary"
            >
              View Team
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}

export default PlayerNotification;
