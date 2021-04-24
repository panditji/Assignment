import SafeJSONStringify from 'safe-json-stringify';
import * as Models from '../models';
import logger from '../../common/logger';
import { CreateSales } from '../interfaces/sales.interface';
import HttpErrors from '../../common/errorconfig';
import SecretsHelper from '../../common/secrets';
import { generateTransactionId } from '../../common/utils';

class Users {

    async salesEntry(payload: CreateSales): Promise<any> {
        logger.debug('Sales-Service Creating Sales Entry');
        try {
            const response = await Models.SalesModel.create(payload);
            return { data: response };
        } catch (err) {
            logger.error(`Sales-Service Error in creating Sales Entry ${SafeJSONStringify(err)}`);
            throw err;
        }
    }

    async get(stats: string): Promise<any> {
        try {
            logger.debug(`[Sales-Service] getting Sales ${stats}`);
            const query = { stats };
            const response = await Models.SalesModel.findAndCountAll();
            if (!response) {
                throw HttpErrors.NotFound('Record not found');
            }
            //date
            const time = new Date();
            const currentDate = time.getFullYear() + '-' + ("0" + (time.getMonth() + 1)).slice(-2) + '-' + ("0" + time.getDate()).slice(-2);
            const data = await Models.SalesModel.findAndCountAll();

            let dates = [];
            for (let item of data.rows) {
                dates.push({ date: item.date, dateFormat: item.createdAt, amount: item.amount });
            }
            if (stats === "daily") {

                const finaData = [];

                for (let hour = 0; hour < 24; hour++) {
                    let sum = 0
                    for (let x of dates) {
                        if (x.dateFormat.getHours() === hour) sum += x.amount
                    }
                    finaData.push({ hourly: hour, total: sum })

                }
                return finaData;
            }



            if (stats === "weekly") {
                let curr = new Date
                let week = {}
                //week
                for (let i = 1; i <= 7; i++) {
                    let first = curr.getDate() - curr.getDay() + i
                    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
                    week[day] = [];
                    const response = await Models.SalesModel.findAndCountAll({ where: { date: day } });
                    console.log(response.count)
                    if (response.count) {
                        let count = 0;
                        let dates = [];
                        for (let item of response.rows) {
                            dates.push({ date: item.date, dateFormat: item.createdAt, amount: item.amount });
                        }
                        const finaData = [];
                        for (let hour = 0; hour < 24; hour++) {
                            let sum = 0
                            for (let x of dates) {
                                if (x.dateFormat.getHours() === hour) sum += x.amount
                            }
                            finaData.push({ hourly: hour, total: sum })
                        }
                        // console.log(finaData)
                        week[day] = finaData
                    }
                }
                return week;
            }


            if (stats === "monthly") {
                var getDaysInMonth = function (month, year) {
                    return new Date(year, month, 0).getDate();
                };
                //date
                const time = new Date();
                const currentDate = time.getFullYear() + '-' + ("0" + (time.getMonth() + 1)).slice(-2) + '-' + ("0" + time.getDate()).slice(-2);

                let curr = new Date
                let week = {}
                //week
                // for (let i = 1; i <= getDaysInMonth((time.getMonth() + 1,time.getFullYear()); i++) {
                //     let first = curr.getDate() - curr.getDay() + i
                //     let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
                //     week[day] = [];
                //     const response = await Models.SalesModel.findAndCountAll({ where: { date: day } });
                //     console.log(response.count)
                //     if (response.count) {
                //         let count = 0;
                //         let dates = [];
                //         for (let item of response.rows) {
                //             dates.push({ date: item.date, dateFormat: item.createdAt, amount: item.amount });
                //         }
                //         const finaData = [];
                //         for (let hour = 0; hour < 24; hour++) {
                //             let sum = 0
                //             for (let x of dates) {
                //                 if (x.dateFormat.getHours() === hour) sum += x.amount
                //             }
                //             finaData.push({ hourly: hour, total: sum })
                //         }
                //         // console.log(finaData)
                //         week[day] = finaData
                //     }
                // }
                // console.log("final", week)
                return "week";
            }



        } catch (err) {
            logger.error(`Sales-Service Error while getting sales Entry   of ${stats} ${SafeJSONStringify(err)}`);
            throw err;
        }
    }
}

const UsersService = new Users();

export default UsersService;
