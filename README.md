# chess-db




MySQL Script
```
create table players(
    player_id     int auto_increment primary key not null,
    username  varchar(20) not null,
    password varchar(20) not null,
    elo     int null
);

create table matches(
    match_id int auto_increment primary key not null,
    player1 int,
    player2 int,
    winner int,
    foreign key (player1) references players(player_id),
    foreign key (player2) references players(player_id)
);

create table tournaments(
    tournament_id int auto_increment primary key not null,
    title varchar(50),
    matches int,
    final_id int,
    winner_id int,
    prize_money int,
    
    foreign key (final_id) references matches(match_id),
    foreign key (winner_id) references players(player_id)

);
```