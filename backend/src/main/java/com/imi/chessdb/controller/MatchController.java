package com.imi.chessdb.controller;

import com.imi.chessdb.model.entities.Match;
import com.imi.chessdb.model.repositories.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/matches")
public class MatchController {

    private final MatchRepository matchRepository;

    @Autowired
    public MatchController(final MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    @GetMapping
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    @GetMapping("/{id}")
    public Match getMatchById(@PathVariable Integer id) {
        return matchRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createMatch(@RequestBody Match match) throws URISyntaxException {
        Match savedMatch = matchRepository.save(match);
        return ResponseEntity.created(new URI("/matches/" + savedMatch.getId())).body(savedMatch);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateMatch(@PathVariable Integer id, @RequestBody Match match) {
        Match currentMatch = matchRepository.findById(id).orElseThrow(RuntimeException::new);
        currentMatch.setPlayer1(match.getPlayer1());
        currentMatch.setPlayer2(match.getPlayer2());
        currentMatch.setWinner(match.getWinner());
        currentMatch.setTournament(match.getTournament());
        currentMatch = matchRepository.save(match);

        return ResponseEntity.ok(currentMatch);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMatch(@PathVariable Integer id) {
        matchRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }



}
