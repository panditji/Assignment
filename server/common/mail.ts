import SgMail, { MailDataRequired } from '@sendgrid/mail';
import { Json } from 'sequelize/types/lib/utils';
import environments from './env';
import logger from './logger';
const { EMAIL_API_KEY, EMAIL_DOMAIN } = environments;
export type EMAIL_OPTIONS = {
    to: string;
    subject: string;
    templateId: string;
    dynamic_template_data: Object;
};
const sendMail = async (options: EMAIL_OPTIONS): Promise<any> => {
    try {
        SgMail.setApiKey(EMAIL_API_KEY);
        const MAIL_OPTIONS = {
            to: options.to,
            from: EMAIL_DOMAIN,
            subject: options?.subject,
            templateId: options?.templateId,
            dynamic_template_data: options?.dynamic_template_data
        };
        await SgMail.send(MAIL_OPTIONS);
        logger.info(`[EMAIL] Sent success to ${options?.to}`);
        return Promise.resolve(true);
    } catch (err) {
        logger.error(`[EMAIL] failed to ${options?.to}`);
        logger.error(err);
        throw err;
    }
};

export default sendMail;