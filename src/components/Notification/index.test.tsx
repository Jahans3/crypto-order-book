import Notification from "./index";
import { notificationStatusAtom, notificationMessageAtom, notificationUptimeAtom } from "../../state/notification";
import { testRoot } from "../../testUtils";
import * as testIds from "./testIds";
import { NOTIFICATION_STATUS } from "../../constants";
import { MutableSnapshot } from "recoil";
import { waitFor, fireEvent } from "@testing-library/react";

describe("Notification", () => {
  test("should not render if notification state is hidden", () => {
    const { queryByTestId } = testRoot(<Notification />);
    const container = queryByTestId(testIds.container);

    expect(container).toBeNull();
  });

  test("should display the message when status is visible", () => {
    const text = "Hello test!";
    const initialiseState = (snap: MutableSnapshot) => {
      snap.set(notificationMessageAtom, text);
      snap.set(notificationStatusAtom, NOTIFICATION_STATUS.VISIBLE);
    };
    const { queryByText } = testRoot(<Notification />, initialiseState);
    const element = queryByText(text);

    expect(element).toBeTruthy();
  });

  test("should remove itself when uptime duration has elapsed", async () => {
    const uptime = 1000;
    const initialiseState = (snap: MutableSnapshot) => {
      snap.set(notificationUptimeAtom, uptime);
      snap.set(notificationMessageAtom, "Hola");
      snap.set(notificationStatusAtom, NOTIFICATION_STATUS.VISIBLE);
    };
    const { queryByTestId } = testRoot(<Notification />, initialiseState);
    const element = queryByTestId(testIds.container);

    expect(element).toBeTruthy();

    await waitFor(
      () => {
        const unmountedElement = queryByTestId(testIds.container);

        expect(unmountedElement).toBeNull();
      },
      { timeout: 1500 }
    );
  });

  test("should remove itself when user clicks 'OK' button", () => {
    const initialiseState = (snap: MutableSnapshot) => {
      snap.set(notificationStatusAtom, NOTIFICATION_STATUS.VISIBLE);
      snap.set(notificationUptimeAtom, 99999);
    };
    const { queryByTestId } = testRoot(<Notification />, initialiseState);
    const button = queryByTestId(testIds.button);

    expect(button).toBeTruthy();

    fireEvent.click(button as HTMLElement);

    const notification = queryByTestId(testIds.container);

    expect(notification).toBeNull();
  });
});
