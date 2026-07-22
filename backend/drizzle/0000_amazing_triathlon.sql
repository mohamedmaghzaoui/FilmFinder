CREATE TABLE `movies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`genre` text NOT NULL,
	`duration` integer NOT NULL,
	`rating` real NOT NULL,
	`release_year` integer NOT NULL,
	`description` text NOT NULL
);
