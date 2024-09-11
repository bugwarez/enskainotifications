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

interface ProposalNotificationProps {
  notification: Notification;
}

function ProposalNotification(props: ProposalNotificationProps) {
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
        You proposed player <b>{props.notification.proposal?.sentPlayerName}</b>{" "}
        to{" "}
        <b>
          {props.notification.proposal?.offeredClubName}(
          {props.notification.proposal?.offeredClubCountry})
        </b>{" "}
        for <b>{props.notification.proposal?.position}</b> position.
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
                src={props.notification.proposal?.avatar}
                alt={props.notification.proposal?.avatar}
              />
              <Avatar
                sx={{
                  width: 200,
                  height: 200,
                  backgroundColor: "transparent",
                }}
                src={props.notification.proposal?.teamLogo}
                alt={props.notification.proposal?.teamName}
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
                  Fullname: {props.notification.proposal?.sentPlayerName}
                </Typography>
                <Typography variant="h6" component="div">
                  Nationality: {props.notification.proposal?.nationality}
                </Typography>
                <Typography variant="h6" component="div">
                  Height: {props.notification.proposal?.height} cm
                </Typography>
                <Typography variant="h6" component="div">
                  Age:{" "}
                  {new Date().getFullYear() -
                    new Date(
                      props.notification.proposal?.birthDate
                    ).getFullYear()}
                  {`(${new Date(
                    props.notification.proposal?.birthDate
                  ).toLocaleDateString()})`}
                </Typography>
              </Grid2>
              <Grid2 item xs={12}>
                <Typography variant="h5" component="div">
                  In-Pitch
                </Typography>
                <Divider />
                <Typography variant="h6" component="div">
                  Position: {props.notification.proposal?.position} -{" "}
                  {positionEmojis[props.notification.proposal?.position] ||
                    "⚽️"}
                </Typography>
                <Typography variant="h6" component="div">
                  Team: {props.notification.proposal?.offeredClubName} (
                  {props.notification.proposal?.offeredClubCountry})
                </Typography>
                <Typography variant="h6" component="div">
                  Requested At:{" "}
                  {new Date(props.notification.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" component="div">
                  Uniform Number: #{props.notification.proposal?.uniformNumber}
                </Typography>
              </Grid2>
              <Grid2 item xs={12}>
                <Typography variant="h5" component="div">
                  Stats
                </Typography>
                <Divider />
                <Typography variant="h6" component="div">
                  Appearances: {props.notification.proposal?.appearances} 🏃‍♂️
                </Typography>
                <Typography variant="h6" component="div">
                  Goals: {props.notification.proposal?.goals} ⚽️
                </Typography>
                <Typography variant="h6" component="div">
                  Assists:
                  {props.notification.proposal?.assists} 🎯
                </Typography>
                <Typography variant="h6" component="div">
                  Time On Field:{" "}
                  {
                    //show the number as digits if its more than 1000
                    props.notification.proposal?.timeOnField > 1000
                      ? props.notification.proposal?.timeOnField.toLocaleString()
                      : props.notification.proposal?.timeOnField
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
            <Button
              variant="contained"
              size="medium"
              sx={{ fontWeight: "bold" }}
              color="error"
            >
              Mark as Read
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}

export default ProposalNotification;
