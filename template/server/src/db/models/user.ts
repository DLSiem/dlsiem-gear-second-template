import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from ".";
import bcrypt from "bcrypt";

type Role = "customer" | "admin" | "superadmin";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  role: Role;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "username" | "imageUrl" | "role"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define<UserInstance>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("username");
        return rawValue ? rawValue : this.getDataValue("email").split("@")[0];
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "customer",
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.username = user.email.split("@")[0];
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

export default User;
