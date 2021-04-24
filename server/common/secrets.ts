import jwt from 'jsonwebtoken';
import environments from './env';
import logger from './logger';

class Secrets {
  secretKey: string = environments.SESSION_SECRET;
  sessionExpire = environments.SESSION_EXPIRY;
  refreshSessionExpire = environments.REFRESH_TOKEN_EXPIRY;

  generate(payload: Record<string, unknown>, exp: string = this.sessionExpire): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: exp });
  }

  generateRefreshToken(payload: Record<string, unknown>, exp: string = this.refreshSessionExpire): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: exp });
  }

  validate(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (err) {
      logger.error(`Token expired ${token}`);
      return false;
    }
  }
}

const SecretsHelper = new Secrets();

export default SecretsHelper;
