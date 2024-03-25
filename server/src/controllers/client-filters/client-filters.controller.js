import { ServerConfiguration } from '##/configs/server.config.js';
import { STATUS_CODE } from '##/constants/constants.js';

export class ClientFiltersController {
  static async getClientFilters(req, res) {
    const squads = ServerConfiguration.clientFiltersSquads;

    return res.status(STATUS_CODE.OK).json({
      squads,
    });
  }
}
