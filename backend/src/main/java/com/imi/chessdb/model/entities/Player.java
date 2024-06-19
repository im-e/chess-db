package com.imi.chessdb.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "players", schema = "chess_db")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "player_id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false, length = 20)
    private String username;

    @Column(name = "elo")
    private Integer elo;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getElo() {
        return elo;
    }

    public void setElo(Integer elo) {
        this.elo = elo;
    }

}