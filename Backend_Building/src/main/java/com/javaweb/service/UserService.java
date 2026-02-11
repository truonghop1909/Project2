package com.javaweb.service;

import java.util.List;
import com.javaweb.model.UserDTO;
import com.javaweb.model.UserCreateRequestDTO;
import com.javaweb.model.UserSearchDTO;

public interface UserService {

    // ADMIN: search user (role, status, keyword)
    List<UserDTO> searchUsers(UserSearchDTO searchDTO);

    // ADMIN hoặc REGISTER
    UserDTO createUser(UserCreateRequestDTO request);

    // ADMIN: khóa / mở user
    void toggleStatus(Integer userId);

    // ADMIN: xem chi tiết user
    UserDTO getUserById(Integer id);

    //Chỉnh quyền 
    void updateUserRoles(Integer userId, List<String> roleCodes);
}
