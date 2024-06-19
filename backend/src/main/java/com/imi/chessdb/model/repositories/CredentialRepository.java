package com.imi.chessdb.model.repositories;

import com.imi.chessdb.model.entities.Credential;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CredentialRepository extends JpaRepository<Credential, Integer> {
}