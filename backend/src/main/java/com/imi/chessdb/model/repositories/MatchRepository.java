package com.imi.chessdb.model.repositories;

import com.imi.chessdb.model.entities.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Integer> {
}