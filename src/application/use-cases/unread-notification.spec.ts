import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotifcation = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readtAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotifcation.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readtAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotifcation = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotifcation.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
