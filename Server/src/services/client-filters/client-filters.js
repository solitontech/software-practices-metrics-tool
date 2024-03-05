import { ServerConfiguration } from '../../configs/server.config.js';

export class ClientFilters {
  static getClientFilters() {
    return {
      squads: ServerConfiguration.clientFilters.squads,
    };
  }
}
