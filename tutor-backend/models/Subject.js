const Subject = (sequelize, DataTypes) => {
  const SubjectModel = sequelize.define('Subject', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    tableName: 'subjects',
    timestamps: true,
  });

  return SubjectModel;
};

module.exports = Subject;
