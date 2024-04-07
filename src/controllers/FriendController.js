import { routes } from '@/controllers/routes';
import { strings } from '@/localization';

export class FriendController {
  constructor(networkService) {
    this.networkService = networkService;
  }

  searchEmail({ email }) {
    return this.networkService.request({
      method: 'GET',
      url: `${routes.friend.searchByEmail}${email}`,
    });
  }

  getAllFriend() {
    return this.networkService.request({
      method: 'GET',
      url: `${routes.friend.getAllFriend}`,
    });
  }
}
