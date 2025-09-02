package com.hiiiiiii.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.empleave.empleavesys.domain.User;
@Repository
public interface UserRepository extends JpaRepository<User, String> {
User findByUsernameAndPassword(String username, String password);
}
