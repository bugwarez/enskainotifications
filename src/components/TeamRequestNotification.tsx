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
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

interface TeamRequestNotificationProps {
  notification: Notification;
}

function TeamRequestNotification(props: TeamRequestNotificationProps) {
  const eur = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });
  const theme = useTheme();
  console.log("props", props);
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
        Team <b>{props.notification.teamRequest?.teamName}</b> in{" "}
        <b>
          {props.notification.teamRequest?.division}(
          {props.notification.teamRequest?.country})
        </b>{" "}
        is looking for a{" "}
        <b>{props.notification.teamRequest?.requestedPosition}</b> player. You
        may be interested in this opportunity.
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
                src={props.notification.teamRequest?.teamLogo}
                alt={props.notification.teamRequest?.teamName}
              />
              <Avatar
                sx={{
                  width: 200,
                  height: 200,
                  backgroundColor: "transparent",
                }}
              >
                <Typography fontSize={200} sx={{ p: 0, m: 0 }} variant="h6">
                  {positionEmojis[
                    props.notification.teamRequest?.requestedPosition
                  ] || "⚽️"}
                </Typography>
              </Avatar>
            </AvatarGroup>
          </Box>
          <CardContent>
            <Typography variant="h6" component="div">
              Position: {props.notification.teamRequest?.requestedPosition} -{" "}
              {positionEmojis[
                props.notification.teamRequest?.requestedPosition
              ] || "⚽️"}
            </Typography>
            <Typography variant="h6" component="div">
              Team: {props.notification.teamRequest?.teamName}
            </Typography>
            <Typography variant="h6" component="div">
              Division: {props.notification.teamRequest?.division} (
              {props.notification.teamRequest?.country})
            </Typography>
            <Typography variant="h6" component="div">
              Requested At:{" "}
              {new Date(props.notification.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="h6" component="div">
              Financials:{" "}
              {eur.format(props.notification.teamRequest?.financials[0])} -{" "}
              {eur.format(props.notification.teamRequest?.financials[1])}
            </Typography>
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

export default TeamRequestNotification;
