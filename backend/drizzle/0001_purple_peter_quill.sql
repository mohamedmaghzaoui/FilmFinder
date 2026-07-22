CREATE TABLE `anime` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`genre` text NOT NULL,
	`episodes` integer NOT NULL,
	`rating` real NOT NULL,
	`release_year` integer NOT NULL,
	`status` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `series` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`genre` text NOT NULL,
	`seasons` integer NOT NULL,
	`episodes` integer NOT NULL,
	`rating` real NOT NULL,
	`release_year` integer NOT NULL,
	`description` text NOT NULL
);
