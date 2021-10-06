import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../Button";
import {
  notificationStatusAtom,
  notificationUptimeAtom,
  notificationMessageAtom,
  onNotificationCloseAtom,
} from "../../state/notification";
import { NOTIFICATION_STATUS } from "../../constants";
import { Container, NotificationText } from "./styled";
import * as testIds from "./testIds";

export default function Notification(): React.ReactElement | null {
  const [notificationStatus, setNotificationStatus] = useRecoilState(notificationStatusAtom);
  const [notificationMessage, setNotificationMessage] = useRecoilState(notificationMessageAtom);
  const [onNotificationClose, setOnNotificationClose] = useRecoilState(onNotificationCloseAtom);
  const [notificationUptime, setNotificationUptime] = useRecoilState(notificationUptimeAtom);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  function resetNotificationState() {
    onNotificationClose?.();

    if (notificationStatus !== NOTIFICATION_STATUS.HIDDEN) {
      setNotificationStatus(NOTIFICATION_STATUS.HIDDEN);
    }

    if (notificationMessage !== "") {
      setNotificationMessage("");
    }

    if (notificationUptime !== 2500) {
      setNotificationUptime(2500);
    }

    if (onNotificationClose !== undefined) {
      setOnNotificationClose(undefined);
    }
  }

  useEffect(() => {
    if (notificationStatus === NOTIFICATION_STATUS.VISIBLE) {
      const id = setTimeout(resetNotificationState, notificationUptime);
      setTimeoutId(id);
    }

    // Ignore the warning to include resetNotificationState as this would cause unwanted useEffect calls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationStatus]);

  if (notificationStatus === NOTIFICATION_STATUS.HIDDEN) {
    return null;
  }

  function closeNotification() {
    resetNotificationState();

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  return (
    <Container data-testid={testIds.container}>
      <NotificationText data-testid={testIds.notificationText}>{notificationMessage}</NotificationText>
      <Button onClick={closeNotification} data-testid={testIds.button}>
        OK
      </Button>
    </Container>
  );
}
