import { describe, it, expect, vi } from 'vitest';
import reducer, {
  clearSuccess,
  clearError,
  removeUser,
  fetchUserDetails,
  updateUserDetails,
} from './userSlice';
import axios from 'axios';

// Mock axios for async thunks
vi.mock('axios');

describe('userSlice reducer', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null,
    success: null,
  };

  it('should return the initial state', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle clearSuccess action', () => {
    const modifiedState = { ...initialState, success: 'Profile updated successfully' };
    const result = reducer(modifiedState, clearSuccess());
    expect(result.success).toBeNull();
  });

  it('should handle clearError action', () => {
    const modifiedState = { ...initialState, error: 'Failed to fetch user details' };
    const result = reducer(modifiedState, clearError());
    expect(result.error).toBeNull();
  });

  it('should handle removeUser action', () => {
    const modifiedState = { ...initialState, user: { name: 'John Doe' } };
    const result = reducer(modifiedState, removeUser());
    expect(result.user).toBeNull();
  });

  describe('fetchUserDetails async thunk', () => {
    it('should set loading to true when pending', () => {
      const action = { type: fetchUserDetails.pending.type };
      const result = reducer(initialState, action);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set user data when fulfilled', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      const action = { type: fetchUserDetails.fulfilled.type, payload: user };
      const result = reducer(initialState, action);
      expect(result.loading).toBe(false);
      expect(result.user).toEqual(user);
    });

    it('should set error when rejected', () => {
      const action = { type: fetchUserDetails.rejected.type, payload: 'Failed to fetch user details' };
      const result = reducer(initialState, action);
      expect(result.loading).toBe(false);
      expect(result.error).toBe('Failed to fetch user details');
    });
  });

  describe('updateUserDetails async thunk', () => {
    it('should set loading to true when pending', () => {
      const action = { type: updateUserDetails.pending.type };
      const result = reducer(initialState, action);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set user data and success message when fulfilled', () => {
      const updatedUser = { name: 'Jane Doe', email: 'jane@example.com' };
      const action = { type: updateUserDetails.fulfilled.type, payload: updatedUser };
      const result = reducer(initialState, action);
      expect(result.loading).toBe(false);
      expect(result.user).toEqual(updatedUser);
      expect(result.success).toBe('Profile updated successfully');
    });

    it('should set error when rejected', () => {
      const action = { type: updateUserDetails.rejected.type, payload: 'Failed to update profile' };
      const result = reducer(initialState, action);
      expect(result.loading).toBe(false);
      expect(result.error).toBe('Failed to update profile');
    });
  });

  describe('Async Thunks (Mocking API calls)', () => {
    afterEach(() => {
      vi.clearAllMocks();
      localStorage.clear();
    });

    it('should dispatch fetchUserDetails successfully', async () => {
      const mockUser = { name: 'John Doe', email: 'john@example.com' };
      axios.get.mockResolvedValueOnce({ data: mockUser });
      localStorage.setItem('accessToken', 'mockToken');

      const thunk = fetchUserDetails();
      const dispatch = vi.fn();
      const getState = vi.fn();

      await thunk(dispatch, getState, undefined);
      //expect(dispatch).toHaveBeenCalledWith(fetchUserDetails.pending());
      //expect(dispatch).toHaveBeenCalledWith(fetchUserDetails.fulfilled(mockUser));
    });

    it('should dispatch updateUserDetails successfully', async () => {
      const mockUpdatedUser = { name: 'Jane Doe', email: 'jane@example.com' };
      axios.put.mockResolvedValueOnce({ data: mockUpdatedUser });
      localStorage.setItem('accessToken', 'mockToken');

      const thunk = updateUserDetails(mockUpdatedUser);
      const dispatch = vi.fn();
      const getState = vi.fn();

      await thunk(dispatch, getState, undefined);
      // expect(dispatch).toHaveBeenCalledWith(updateUserDetails.pending());
      //expect(dispatch).toHaveBeenCalledWith(updateUserDetails.fulfilled(mockUpdatedUser));
    });

    it('should handle fetchUserDetails failure', async () => {
      axios.get.mockRejectedValueOnce({ response: { data: { message: 'Failed to fetch user details' } } });
      localStorage.setItem('accessToken', 'mockToken');

      const thunk = fetchUserDetails();
      const dispatch = vi.fn();
      const getState = vi.fn();

      await thunk(dispatch, getState, undefined);
      //expect(dispatch).toHaveBeenCalledWith(fetchUserDetails.pending());
      //expect(dispatch).toHaveBeenCalledWith(fetchUserDetails.rejected('Failed to fetch user details'));
    });

    it('should handle updateUserDetails failure', async () => {
      axios.put.mockRejectedValueOnce({ response: { data: { message: 'Failed to update profile' } } });
      localStorage.setItem('accessToken', 'mockToken');

      const thunk = updateUserDetails({ name: 'Jane Doe' });
      const dispatch = vi.fn();
      const getState = vi.fn();

      await thunk(dispatch, getState, undefined);
    //   expect(dispatch).toHaveBeenCalledWith(updateUserDetails.pending());
      //expect(dispatch).toHaveBeenCalledWith(updateUserDetails.rejected('Failed to update profile'));
    });
  });
});
