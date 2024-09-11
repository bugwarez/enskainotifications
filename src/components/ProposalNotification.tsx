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

interface ProposalNotificationProps {
  notification: Notification | any;
}

function ProposalNotification(props: ProposalNotificationProps) {
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
        You proposed player <b>{props.notification.proposal?.sentPlayerName}</b>{" "}
        to{" "}
        <b>
          {props.notification.proposal?.offeredClubName}(
          {props.notification.proposal?.offeredClubCountry})
        </b>{" "}
        for <b>{props.notification.proposal?.position}</b> position.
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
                flexDirection: { xs: "column-reverse", md: "row" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 200,
                  height: 200,
                  backgroundColor: "transparent",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={props.notification.proposal?.avatar}
                alt={props.notification.proposal?.sentPlayerName}
              />
              <Avatar
                sx={{
                  width: 200,
                  height: 200,
                  backgroundColor: "transparent",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={props.notification.proposal?.offeredClubLogo}
                alt={props.notification.proposal?.offeredClubName}
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
                  ).toLocaleDateString("en-US")})`}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" component="div">
                  In-Pitch
                </Typography>
                <Divider />
                <Typography variant="h6" component="div">
                  Position: {props.notification.proposal?.position} -{" "}
                  {/* @ts-expect-error - emoji */}
                  {positionEmojis[props.notification.proposal?.position] ||
                    "⚽️"}
                </Typography>
                <Typography variant="h6" component="div">
                  Team: {props.notification.proposal?.offeredClubName} (
                  {props.notification.proposal?.offeredClubCountry})
                </Typography>
                <Typography variant="h6" component="div">
                  Requested At:{" "}
                  {new Date(props.notification.createdAt).toLocaleDateString(
                    "en-US"
                  )}
                </Typography>
                <Typography variant="h6" component="div">
                  Uniform Number: #{props.notification.proposal?.uniformNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
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

export default ProposalNotification;
