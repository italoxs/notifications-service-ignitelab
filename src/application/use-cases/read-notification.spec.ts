import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotifcation = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotifcation.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readtAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotifcation = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotifcation.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
