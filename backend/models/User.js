const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['parent', 'teacher', 'admin'], default: 'parent' },
    childName: { type: String },
    classroom: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = function (plain) {
  return bcrypt.hash(plain, 10);
};

userSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.methods.toSafeJSON = function () {
  const { _id, name, email, role, childName, classroom, phone, createdAt } = this;
  return { id: _id, name, email, role, childName, classroom, phone, createdAt };
};

module.exports = mongoose.model('User', userSchema);
