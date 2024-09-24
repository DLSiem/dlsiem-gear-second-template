import { Sequelize } from "sequelize";

type Environment = "development" | "test" | "production";

const env = (process.env.NODE_ENV as Environment) || "development";

import config from "../../config/config";

const configDef = config[env];

const sequelize = new Sequelize(
  configDef.database,
  configDef.username,
  configDef.password,
  {
    host: configDef.host,
    dialect: configDef.dialect,
    logging: false,
  }
);

export { sequelize, Sequelize };
