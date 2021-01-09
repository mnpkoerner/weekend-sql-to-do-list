-- database name: weekend-to-do-app

CREATE TABLE "tasks"(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"priority" VARCHAR,
	"est_time" INT DEFAULT 0,
    "act_time" INT DEFAULT 0,
    "status" BOOLEAN DEFAULT false
);

-- dummy data

INSERT INTO "tasks" ("task", "priority", "est_time")
VALUES ('Take out garbage', 'Short term', 0),
('Wash dishes', 'Short term', 15),
('Vacuum', 'Short term', 30),
('Laundry', 'Mid term', 45),
('Grocery shopping', 'Long term', 60),
('Repaint living room', 'Long term', 75);

INSERT INTO "tasks" ("task", "priority", "act_time", "status")
VALUES ('Walk dog', 'Long term', 30, true);
