package com.imi.chessdb.model.repositories;

import com.imi.chessdb.model.entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
}