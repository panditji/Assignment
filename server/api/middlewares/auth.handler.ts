import RequestIP from 'request-ip';
import logger from '../../common/logger';
import HttpErrors from '../../common/errorconfig';
import errorHandler from './error.handler';
import { cleanObject } from '../../common/utils';
import { ExpressRequest, ExpressResponse, ExpressNextFunction } from '../interfaces/express.interface';
import environments from '../../common/env';
import SecretsHelper from '../../common/secrets';

const Auth = async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction): Promise<any> => {
  try {
    const clientIp = RequestIP.getClientIp(req);
    logger.info(`[Auth] Verifying Auth for client ${clientIp}`);
    const protocol = req?.protocol;
    const token = req?.headers?.authorization;
    const apiKey = req?.headers?.['x-api-key'];

    if (Number(environments.AUTH) === 1) {
      /* Stage 1 => CHECK HTTPS_ONLY Protocol */
      if (Number(environments.HTTPS_ONLY) === 1 && protocol !== 'https') {
        throw HttpErrors.Forbidden('Invalid protocol, only https connections are supported');
      }

      /* Stage 2 => Valid Client */

      if (Number(environments.VALIDATE_API_KEY) && apiKey !== environments.API_KEY) {
        throw HttpErrors.Forbidden('Unknown Client');
      }

      /* Stage 3 => Authentic Client */

      if (!token) {
        throw HttpErrors.Unauthorized('Authentication required');
      }

      const [scheme, accessToken] = token.split(' ');
      if (scheme !== 'Bearer') {
        throw HttpErrors.Unauthorized('Invalid authentication scheme');
      }
      const user = SecretsHelper.validate(accessToken);

      if (!user) {
        throw HttpErrors.Unauthorized('Authentication failed, invalid or expired token');
      }

      req.user = cleanObject(user);
    }
    next();
  } catch (err) {
    logger.error(`[Auth] Error while validating auth`);
    errorHandler(err, req, res, next);
  }
};

export default Auth;
