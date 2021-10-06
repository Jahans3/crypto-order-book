import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Button from "../Button";
import { notificationStatusAtom, notificationUptimeAtom, notificationMessageAtom } from "../../state/notification";
import { NOTIFICATION_STATUS } from "../../constants";
import { Container, NotificationText } from "./styled";

export default function Notification(): React.ReactElement | null {
  const [notificationStatus, setNotificationStatus] = useRecoilState(notificationStatusAtom);
  const [notificationMessage, setNotificationMessage] = useRecoilState(notificationMessageAtom);
  const notificationUptime = useRecoilValue(notificationUptimeAtom);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (notificationStatus === NOTIFICATION_STATUS.VISIBLE) {
      const id = setTimeout(() => {
        setNotificationStatus(NOTIFICATION_STATUS.HIDDEN);
        setNotificationMessage("");
      }, notificationUptime);

      setTimeoutId(id);
    }
  }, [notificationStatus, notificationUptime, setNotificationStatus, setNotificationMessage]);

  if (notificationStatus === NOTIFICATION_STATUS.HIDDEN) {
    return null;
  }

  function closeNotification() {
    setNotificationStatus(NOTIFICATION_STATUS.HIDDEN);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  return (
    <Container>
      <NotificationText>{notificationMessage}</NotificationText>
      <Button onClick={closeNotification}>OK</Button>
    </Container>
  );
}
