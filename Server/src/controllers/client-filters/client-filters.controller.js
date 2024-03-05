import { ClientFilters } from '../../services/client-filters/client-filters.js';
import { STATUS_CODE } from '../../constants/index.js';

export class ClientFiltersController {
  static async getClientFilters(req, res) {
    const clientFilters = ClientFilters.getClientFilters();

    return res.status(STATUS_CODE.OK).json(clientFilters);
  }
}
