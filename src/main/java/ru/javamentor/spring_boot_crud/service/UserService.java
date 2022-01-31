package ru.javamentor.spring_boot_crud.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.javamentor.spring_boot_crud.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {

    @Override
    UserDetails loadUserByUsername(String s) throws UsernameNotFoundException;

    User getUserById(long id);

    //User findByUsername(String username);

    User findByEmail(String email);

    List<User> findAll();

    void create(User user);

    User update(User user);

    void deleteById(long entityId);
}
