package com.imi.chessdb.controller;

import com.imi.chessdb.model.entities.Tournament;
import com.imi.chessdb.model.repositories.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/tournaments")
public class TournamentController {

    private final TournamentRepository tournamentRepository;

    @Autowired
    public TournamentController(final TournamentRepository tournamentRepository) {
        this.tournamentRepository = tournamentRepository;
    }

    @GetMapping
    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Tournament getTournamentById(@PathVariable Integer id) {
        return tournamentRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createTournament(@RequestBody Tournament tournament) throws URISyntaxException {
        Tournament savedTournament = tournamentRepository.save(tournament);
        return ResponseEntity.created(new URI("/tournaments/" + savedTournament.getId())).body(savedTournament);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateTournament(@PathVariable Integer id, @RequestBody Tournament tournament) {
        Tournament currentTournament = tournamentRepository.findById(id).orElseThrow(RuntimeException::new);
        currentTournament.setTitle(tournament.getTitle());
        currentTournament.setMatches(tournament.getMatches());
        currentTournament.setWinner(tournament.getWinner());
        currentTournament.setFinalField(tournament.getFinalField());
        currentTournament.setPrizeMoney(tournament.getPrizeMoney());

        currentTournament = tournamentRepository.save(tournament);

        return ResponseEntity.ok(currentTournament);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteTournament(@PathVariable Integer id) {
        tournamentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }



}