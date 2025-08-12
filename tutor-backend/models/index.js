const { sequelize } = require('../config/database');

// Import models
const User = require('./User');
const Tutor = require('./Tutor');
const Subject = require('./Subject');
const Booking = require('./Booking');

// Initialize models with Sequelize
const models = {
  User: User(sequelize, sequelize.Sequelize.DataTypes),
  Tutor: Tutor(sequelize, sequelize.Sequelize.DataTypes),
  Subject: Subject(sequelize, sequelize.Sequelize.DataTypes),
  Booking: Booking(sequelize, sequelize.Sequelize.DataTypes),
};

// User - Tutor relationship (One-to-One)
models.User.hasOne(models.Tutor, { foreignKey: 'userId', as: 'tutorProfile' });
models.Tutor.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

// User - Booking relationships
models.User.hasMany(models.Booking, { foreignKey: 'studentId', as: 'studentBookings' });
models.User.hasMany(models.Booking, { foreignKey: 'tutorId', as: 'tutorBookings' });

// Tutor - Booking relationship
models.Tutor.hasMany(models.Booking, { foreignKey: 'tutorId', as: 'bookings' });

// Subject - Booking relationship
models.Subject.hasMany(models.Booking, { foreignKey: 'subjectId', as: 'bookings' });

// Booking relationships
models.Booking.belongsTo(models.User, { foreignKey: 'studentId', as: 'student' });
models.Booking.belongsTo(models.User, { foreignKey: 'tutorId', as: 'tutor' });
models.Booking.belongsTo(models.Tutor, { foreignKey: 'tutorId', as: 'tutorProfile' });
models.Booking.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });

module.exports = {
  sequelize,
  ...models,
};
