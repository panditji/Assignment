export { default as SalesModel } from './sales.model';



// if (stats === "monthly") {
//     var getDaysInMonth = function (month, year) {
//         return new Date(year, month, 0).getDate();
//     };
//     //date
//     const time = new Date();
//     const currentDate = time.getFullYear() + '-' + ("0" + (time.getMonth() + 1)).slice(-2) + '-' + ("0" + time.getDate()).slice(-2);

//     let curr = new Date
//     let week = {}
//     //week
//     for (let i = 1; i <= ; i++) {
//         let first = curr.getDate() - curr.getDay() + i
//         let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
//         week[day] = [];
//         const response = await Models.SalesModel.findAndCountAll({ where: { date: day } });
//         console.log(response.count)
//         if (response.count) {
//             let count = 0;
//             let dates = [];
//             for (let item of response.rows) {
//                 dates.push({ date: item.date, dateFormat: item.createdAt, amount: item.amount });
//             }
//             const finaData = [];
//             for (let hour = 0; hour < 24; hour++) {
//                 let sum = 0
//                 for (let x of dates) {
//                     if (x.dateFormat.getHours() === hour) sum += x.amount
//                 }
//                 finaData.push({ hourly: hour, total: sum })
//             }
//             // console.log(finaData)
//             week[day] = finaData
//         }
//     }
//     console.log("final", week)
//     return "week";
// }

