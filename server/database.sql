-- database name: weekend-to-do-app

CREATE TABLE "tasks"(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"priority" VARCHAR (1) NOT NULL,
	"est_time" INT NOT NULL,
    "act_time" INT DEFAULT 0,
    "status" BOOLEAN DEFAULT false
);

-- dummy data

INSERT INTO "tasks" ("task", "priority", "est_time")
VALUES ('Take out garbage', 'S', 0),
('Wash dishes', 'S', 15),
('Vacuum', 'S', 30),
('Laundry', 'M', 45),
('Grocery shopping', 'L', 60),
('Repaint living room', 'L', 75);
