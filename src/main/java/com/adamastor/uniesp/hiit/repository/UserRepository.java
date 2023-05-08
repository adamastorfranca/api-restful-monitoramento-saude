package com.adamastor.uniesp.hiit.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adamastor.uniesp.hiit.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

}
