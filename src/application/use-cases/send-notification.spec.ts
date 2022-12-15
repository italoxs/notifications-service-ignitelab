import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotifcation = new SendNotification(notificationsRepository);

    const { notification } = await sendNotifcation.execute({
      recipientId: 'example-recipient-id',
      content: 'This is a notification',
      category: 'social',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
