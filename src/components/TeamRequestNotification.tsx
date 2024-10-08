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
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
interface TeamRequestNotificationProps {
  notification: Notification | any;
}

function TeamRequestNotification(props: TeamRequestNotificationProps) {
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
        Team <b>{props.notification.teamRequest?.teamName}</b> in{" "}
        <b>
          {props.notification.teamRequest?.division}(
          {props.notification.teamRequest?.country})
        </b>{" "}
        is looking for a{" "}
        <b>{props.notification.teamRequest?.requestedPosition}</b> player. You
        may be interested in this opportunity.
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
                  {/* @ts-expect-error - emoji */}
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
              {/* @ts-expect-error - emoji */}
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
              {new Date(props.notification.createdAt).toLocaleDateString(
                "en-US"
              )}
            </Typography>
            <Typography variant="h6" component="div">
              Financials:{" "}
              {eur.format(props.notification.teamRequest?.financials[0])} -{" "}
              {eur.format(props.notification.teamRequest?.financials[1])}
            </Typography>
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
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}

export default TeamRequestNotification;
