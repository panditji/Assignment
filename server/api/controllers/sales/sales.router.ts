import express from 'express';
import SalesController from './sales.controller';
import { controllerWrapper } from '../../middlewares/response.handler';


const SalesRouter = express.Router();

SalesRouter.post('/dataEntry', controllerWrapper(SalesController.salesEntry));
SalesRouter.get('/entryData/:stats', controllerWrapper(SalesController.get));


export default SalesRouter;
