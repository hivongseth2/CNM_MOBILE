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
}
