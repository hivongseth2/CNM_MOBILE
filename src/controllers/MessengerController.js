import { routes } from '@/controllers/routes';
import { strings } from '@/localization';

export class MessengerController {
  constructor(networkService) {
    this.networkService = networkService;
  }

  getAllMessenger() {
    return this.networkService.request({
      method: 'GET',
      url: `${routes.message.getAllMessenger}`,
    });
  }

  sendMessage({ receiverId, content }) {
    return this.networkService.request({
      method: 'POST',
      url: `${routes.message.sendMessage}`,
      data: { receiverId, content },
    });
  }

  sendFile(formData) {
    return this.networkService.request({
      method: 'POST',
      url: `${routes.message.sendFile}`,
      formData,
    });
  }
}
