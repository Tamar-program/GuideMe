import { setToken, setUser,setRole } from '../../redux/tokenSlice';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';

const AllFavoritesTours = () => {
    const { token, role, user } = useSelector((state) => state.token);
    const userId=user.userId

}
export default AllFavoritesTours;