import User from '../models/User.js';
import Status from '../models/Status.js';

export const migrateExistingUsers = async () => {
  try {
    const users = await User.find();
    
    const defaultStatuses = [
      { name: 'work', color: '#3b82f6', isDefault: true },
      { name: 'family', color: '#22c55e', isDefault: true },
      { name: 'private', color: '#a855f7', isDefault: true },
      { name: 'friends', color: '#eab308', isDefault: true },
      { name: 'others', color: '#ef4444', isDefault: true },
    ];
    
    for (const user of users) {
      const existingStatuses = await Status.find({ userId: user._id });
      
      if (existingStatuses.length === 0) {
        console.log(`Adding default statuses for user: ${user.email}`);
        
        for (const statusData of defaultStatuses) {
          await Status.create({
            userId: user._id,
            ...statusData,
          });
        }
      }
    }
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
  }
};
