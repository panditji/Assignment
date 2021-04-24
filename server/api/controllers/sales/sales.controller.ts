import SafeJSONStringify from 'safe-json-stringify';
import Joi from 'joi';
import { HttpStatus, ResponseSchema } from '../../../common/constants';
import logger from '../../../common/logger';
import { formatResponse, cleanObject, filterParams } from '../../../common/utils';
import HttpErrors from '../../../common/errorconfig';
import { CreateSales } from '../../interfaces/sales.interface';
import SalesService from '../../services/sales.service';
import { ExpressRequest } from '../../interfaces/express.interface';
import environments from '../../../common/env';



export class UserController {


    async get(req: ExpressRequest): Promise<ResponseSchema> {
        try {
            logger.debug('[Sales-Controller] Sales get by  ');
            const { stats } = req.params;
            if (!stats) {
                throw HttpErrors.BadRequest('stats  required');
            }

            if (stats == 'daily' || stats == 'weekly' || stats == 'monthly') {
                const user = await SalesService.get(stats);
                logger.debug('[Sales-Controller] User get by id success');
                return formatResponse(user, HttpStatus.OK);
            }
            throw HttpErrors.BadRequest('Stats parm either daily||weekly||monthly');


        } catch (err) {
            logger.error('[Users-Controller] User get by id error');
            throw err;
        }
    }


    async salesEntry(req: ExpressRequest): Promise<ResponseSchema> {
        try {
            logger.debug('[Sales-Controller] Sales creation started');
            const { userName, amount, date } = req.body

            const schema = {
                userName: Joi.string().required(),
                amount: Joi.number().required(),
                date: Joi.date().required(),
            };
            const request: Record<string, any> = filterParams(Object.keys(schema), cleanObject({ ...req?.body }));
            const { error } = Joi.object(schema).validate(request);
            if (error) {
                const err = HttpErrors.PreconditionedFailed();
                err.message = error?.message;
                throw err;
            }

            const payload: CreateSales = {
                userName: userName,
                amount: amount,
                date: date,
            };
            const response = await SalesService.salesEntry(cleanObject(payload));

            logger.info('[Sales-Controller] Sales Entry successfully created');
            return formatResponse({ response }, HttpStatus.CREATED);
        } catch (err) {
            logger.error(`Error in creating Sales Entry ${SafeJSONStringify(err)}`);
            throw err;
        }
    }

}

export default new UserController();
