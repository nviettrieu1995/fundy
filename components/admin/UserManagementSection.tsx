
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';
import LoadingSpinner from '../common/LoadingSpinner';
import { User, UserMembershipType } from '../../types';
import { getManagedUsers, updateManagedUser, deleteManagedUser } from '../../services/adminDataService';
import { PencilIcon, TrashIcon, CreditCardIcon, ArrowUpTrayIcon as UpgradeIcon, LockClosedIcon, LockOpenIcon, UserCircleIcon } from '../common/Icon';
import { USER_MEMBERSHIP_PLANS, DEFAULT_AVATAR_URL } from '../../constants';

const UserManagementSection: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User> | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const data = await getManagedUsers();
    setUsers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setEditedUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editedUser) return;
    const { name, value } = e.target;
    setEditedUser(prev => ({ 
        ...prev, 
        [name]: name === 'credits' ? parseInt(value,10) : 
               name === 'membership' ? value as UserMembershipType : value 
    }));
  };

  const handleSaveChanges = async () => {
    if (!editedUser || !selectedUser) return;
    // Ensure membership is of UserMembershipType if present
    const updatePayload: User = { ...selectedUser, ...editedUser } as User;
    if (editedUser.membership && !Object.values(UserMembershipType).includes(editedUser.membership as UserMembershipType)) {
        alert("Invalid membership type selected.");
        return;
    }

    const updated = await updateManagedUser(updatePayload);
    if (updated) {
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    }
    handleCloseEditModal();
    alert('User updated successfully (mock).');
  };

  const handleOpenConfirmDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsConfirmDeleteModalOpen(true);
  };
  
  const handleCloseConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    const success = await deleteManagedUser(selectedUser.id);
    if (success) {
      setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
      alert('User deleted successfully (mock).');
    } else {
      alert('Failed to delete user (mock).');
    }
    handleCloseConfirmDeleteModal();
  };
  
  // Mock lock/unlock
  const toggleLockUser = (userId: string) => {
    alert(`Toggled lock status for user ${userId} (mock).`);
    // In a real app, update user status and re-fetch or update local state
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  return (
    <Card title="Quản Lý Người Dùng">
      <Input
        placeholder="Tìm kiếm theo tên hoặc email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 max-w-sm"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-secondary-200">
          <thead className="bg-secondary-100">
            <tr>
              {['User', 'Email', 'Phone', 'Membership', 'Credits', 'Actions'].map(header => (
                <th key={header} className="px-4 py-2 border-b text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-secondary-700 text-sm">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-secondary-50">
                <td className="px-4 py-2 border-b">
                    <div className="flex items-center">
                        <img src={user.avatarUrl || DEFAULT_AVATAR_URL} alt={user.name} className="h-8 w-8 rounded-full mr-2 object-cover" />
                        {user.name}
                    </div>
                </td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.phone || 'N/A'}</td>
                <td className="px-4 py-2 border-b">{user.membershipPlanName || user.membership}</td>
                <td className="px-4 py-2 border-b">{user.credits}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" onClick={() => handleOpenEditModal(user)} aria-label="Edit user">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toggleLockUser(user.id)} aria-label="Toggle lock user">
                       {/* Placeholder for lock status, assuming not locked by default */}
                       <LockOpenIcon className="h-4 w-4" /> 
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleOpenConfirmDeleteModal(user)} aria-label="Delete user">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && <p className="text-center py-4 text-secondary-500">No users found.</p>}
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && editedUser && (
        <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal} title={`Edit User: ${selectedUser.name}`} size="lg">
          <div className="space-y-4">
            <Input label="Name" name="name" value={editedUser.name || ''} onChange={handleInputChange} />
            <Input label="Email" name="email" type="email" value={editedUser.email || ''} onChange={handleInputChange} />
            <Input label="Phone" name="phone" value={editedUser.phone || ''} onChange={handleInputChange} />
            <div>
                <label htmlFor="membership" className="block text-sm font-medium text-secondary-700 mb-1">Membership</label>
                <select 
                    name="membership" 
                    id="membership" 
                    value={editedUser.membership} 
                    onChange={handleInputChange} 
                    className="block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-secondary-900"
                >
                    {Object.values(UserMembershipType).map(type => (
                        <option key={type} value={type}>{USER_MEMBERSHIP_PLANS[type]?.name || type}</option>
                    ))}
                </select>
            </div>
            <Input label="Credits" name="credits" type="number" value={editedUser.credits?.toString() || '0'} onChange={handleInputChange} />
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={handleCloseEditModal}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </div>
        </Modal>
      )}
      
      {/* Confirm Delete Modal */}
       {isConfirmDeleteModalOpen && selectedUser && (
        <Modal isOpen={isConfirmDeleteModalOpen} onClose={handleCloseConfirmDeleteModal} title="Confirm Delete User">
            <p>Are you sure you want to delete user <strong>{selectedUser.name}</strong> ({selectedUser.email})?</p>
            <p className="text-red-600 text-sm">This action cannot be undone.</p>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={handleCloseConfirmDeleteModal}>Cancel</Button>
              <Button variant="danger" onClick={handleDeleteUser}>Delete User</Button>
            </div>
        </Modal>
       )}
    </Card>
  );
};

export default UserManagementSection;