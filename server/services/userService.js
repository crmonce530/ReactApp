const winston = require('winston');

// In-memory user storage (replace with database in production)
let users = [];
let nextUserId = 1;

/**
 * Create a new user
 */
const createUser = async (userData) => {
  try {
    const newUser = {
      id: nextUserId++,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);
    
    winston.info(`User created: ${newUser.email} (ID: ${newUser.id})`);
    return newUser;
  } catch (error) {
    winston.error('Error creating user:', error.message);
    throw error;
  }
};

/**
 * Find user by email
 */
const findUserByEmail = async (email) => {
  try {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  } catch (error) {
    winston.error('Error finding user by email:', error.message);
    throw error;
  }
};

/**
 * Find user by ID
 */
const findUserById = async (id) => {
  try {
    const user = users.find(u => u.id === parseInt(id));
    return user || null;
  } catch (error) {
    winston.error('Error finding user by ID:', error.message);
    throw error;
  }
};

/**
 * Update user
 */
const updateUser = async (id, updateData) => {
  try {
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date()
    };

    winston.info(`User updated: ${users[userIndex].email} (ID: ${id})`);
    return users[userIndex];
  } catch (error) {
    winston.error('Error updating user:', error.message);
    throw error;
  }
};

/**
 * Delete user
 */
const deleteUser = async (id) => {
  try {
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    
    winston.info(`User deleted: ${deletedUser.email} (ID: ${id})`);
    return deletedUser;
  } catch (error) {
    winston.error('Error deleting user:', error.message);
    throw error;
  }
};

/**
 * Get all users (with pagination)
 */
const getAllUsers = async (page = 1, limit = 10, search = '') => {
  try {
    let filteredUsers = users;

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = users.filter(user => 
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.company.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredUsers.length,
        pages: Math.ceil(filteredUsers.length / limit)
      }
    };
  } catch (error) {
    winston.error('Error getting all users:', error.message);
    throw error;
  }
};

/**
 * Verify user email
 */
const verifyUserEmail = async (email) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    user.emailVerified = true;
    user.updatedAt = new Date();

    winston.info(`Email verified: ${email}`);
    return user;
  } catch (error) {
    winston.error('Error verifying user email:', error.message);
    throw error;
  }
};

/**
 * Update user password
 */
const updateUserPassword = async (id, newPassword) => {
  try {
    const user = await findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.password = newPassword;
    user.updatedAt = new Date();

    winston.info(`Password updated for user: ${user.email} (ID: ${id})`);
    return user;
  } catch (error) {
    winston.error('Error updating user password:', error.message);
    throw error;
  }
};

/**
 * Deactivate user
 */
const deactivateUser = async (id) => {
  try {
    const user = await findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.isActive = false;
    user.updatedAt = new Date();

    winston.info(`User deactivated: ${user.email} (ID: ${id})`);
    return user;
  } catch (error) {
    winston.error('Error deactivating user:', error.message);
    throw error;
  }
};

/**
 * Get user statistics
 */
const getUserStats = async () => {
  try {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.isActive).length;
    const verifiedUsers = users.filter(u => u.emailVerified).length;
    const recentUsers = users.filter(u => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(u.createdAt) > thirtyDaysAgo;
    }).length;

    return {
      totalUsers,
      activeUsers,
      verifiedUsers,
      recentUsers,
      verificationRate: totalUsers > 0 ? ((verifiedUsers / totalUsers) * 100).toFixed(2) : 0
    };
  } catch (error) {
    winston.error('Error getting user stats:', error.message);
    throw error;
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  verifyUserEmail,
  updateUserPassword,
  deactivateUser,
  getUserStats
}; 