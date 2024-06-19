package com.imi.chessdb.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tournaments", schema = "chess_db")
public class Tournament {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "tournament_id", nullable = false)
    private Integer id;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "matches")
    private Integer matches;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "final_id")
    private Match finalField;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "winner_id")
    private Player winner;

    @Column(name = "prize_money")
    private Integer prizeMoney;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getMatches() {
        return matches;
    }

    public void setMatches(Integer matches) {
        this.matches = matches;
    }

    public Match getFinalField() {
        return finalField;
    }

    public void setFinalField(Match finalField) {
        this.finalField = finalField;
    }

    public Player getWinner() {
        return winner;
    }

    public void setWinner(Player winner) {
        this.winner = winner;
    }

    public Integer getPrizeMoney() {
        return prizeMoney;
    }

    public void setPrizeMoney(Integer prizeMoney) {
        this.prizeMoney = prizeMoney;
    }

}