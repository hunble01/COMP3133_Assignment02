const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');
const dotenv = require('dotenv');

dotenv.config();

const resolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');

      return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    },
    getAllEmployees: async () => await Employee.find(),
    searchEmployeeByEID: async (_, { id }) => await Employee.findById(id),
    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      return await Employee.find({ $or: [{ designation }, { department }] });
    }
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      return await newUser.save();
    },
    addEmployee: async (_, args) => {
      const newEmployee = new Employee(args);
      return await newEmployee.save();
    },
    updateEmployee: async (_, { id, ...updates }) => {
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully.";
    }
  }
};

module.exports = resolvers;
