import { DataTypes, ModelAttributes, Model, HasMany, Sequelize } from 'sequelize';
import { BaseSchema, BaseOptions, } from './base';
const SalesSchema: ModelAttributes = {
    salesId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: 'sales_id',
    },

    userName: {
        type: DataTypes.STRING,
        field: 'user_name',
        allowNull: false,
    },

    date: {
        type: DataTypes.STRING,
        field: 'date',
        allowNull: false,
    },

    amount: {
        type: DataTypes.INTEGER,
        field: 'amount',
        allowNull: false,
    },

};

class SalesModel extends Model {
    public readonly salesId!: string;
    public userName!: string;
    public date!: string;
    public amount!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public static initialize(sequelize: Sequelize): void {
        SalesModel.init(
            {
                ...SalesSchema,
            },
            {
                sequelize,
                modelName: 'sales',
                tableName: 'sales',
                ...BaseOptions,
            },
        );

    }
}

export default SalesModel;
