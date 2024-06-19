package com.imi.chessdb.controller;

import com.imi.chessdb.model.entities.Player;
import com.imi.chessdb.model.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/players")
public class PlayerController {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerController(final PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Player getPlayerById(@PathVariable Integer id) {
        return playerRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createPlayer(@RequestBody Player player) throws URISyntaxException {
        Player savedPlayer = playerRepository.save(player);
        return ResponseEntity.created(new URI("/players/" + savedPlayer.getId())).body(savedPlayer);
    }

    @PutMapping("/{id}")
    public ResponseEntity updatePlayer(@PathVariable Integer id, @RequestBody Player player) {
        Player currentPlayer = playerRepository.findById(id).orElseThrow(RuntimeException::new);
        currentPlayer.setUsername(player.getUsername());
        currentPlayer.setElo(player.getElo());
        currentPlayer = playerRepository.save(player);

        return ResponseEntity.ok(currentPlayer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePlayer(@PathVariable Integer id) {
        playerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }



}
