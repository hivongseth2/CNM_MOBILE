import { routes } from '@/controllers/routes';
import { strings } from '@/localization';

export class UserController {
  constructor(networkService) {
    this.networkService = networkService;
  }

  login({ email, password }) {
    return this.networkService.request({
      method: 'POST',
      url: routes.authentication.login,
      data: { email, password },
    });
  }

  register({ fullName, phone, dateOfBirth, email, password }) {
    return this.networkService.request({
      method: 'POST',
      url: routes.authentication.register,
      data: { fullName, phone, dateOfBirth, email, password },
    });
  }

  veritifi({ email, verificationCode }) {
    return this.networkService.request({
      method: 'POST',
      url: routes.authentication.veritifi,
      data: { email, verificationCode },
    });
  }

  GenCode({ email }) {
    return this.networkService.request({
      method: 'POST',
      url: routes.authentication.gencode + email,
    });
  }
  logout({ demoMode } = {}) {
    if (demoMode) {
      return new Promise((resolve) => {
        setTimeout(resolve, 250);
      });
    }

    return this.networkService.request({
      method: 'DELETE',
      url: routes.authentication.logout,
    });
  }
}
