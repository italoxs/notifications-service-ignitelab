import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotifcation = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotifcation.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotifcation = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotifcation.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
