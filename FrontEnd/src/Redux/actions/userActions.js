import { LINK_API } from '../../../components/LinkApi';

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_REGISTER_REQUEST' });

    const response = await fetch(`${LINK_API}/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.status === 201) {
      dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
    } else {
      dispatch({ type: 'USER_REGISTER_FAIL', payload: data.message || 'Registration failed' });
    }
  } catch (error) {
    dispatch({ type: 'USER_REGISTER_FAIL', payload: 'Server error' + error });
  }
};
