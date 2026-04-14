package in.ishikag.foodiesapi.service;

import in.ishikag.foodiesapi.io.UserRequest;
import in.ishikag.foodiesapi.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}
