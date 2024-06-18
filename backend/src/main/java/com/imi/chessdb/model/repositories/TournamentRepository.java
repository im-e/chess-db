package com.imi.chessdb.model.repositories;

import com.imi.chessdb.model.entities.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TournamentRepository extends JpaRepository<Tournament, Integer> {
}