// Uses Node.js built-in SQLite (available since Node v22.5 — no npm package needed)
const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const DB_PATH = path.join(__dirname, 'health.db');
const db = new DatabaseSync(DB_PATH);

// Enable WAL mode for better performance
db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA foreign_keys = ON');

// ─── Create Tables ─────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT    NOT NULL,
    email     TEXT    NOT NULL UNIQUE,
    password  TEXT    NOT NULL,
    created_at TEXT   DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS vitals (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    type        TEXT    NOT NULL,
    value       REAL    NOT NULL,
    unit        TEXT    NOT NULL,
    note        TEXT,
    recorded_at TEXT    DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS medications (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,
    name       TEXT    NOT NULL,
    dosage     TEXT    NOT NULL,
    frequency  TEXT    NOT NULL,
    start_date TEXT,
    end_date   TEXT,
    notes      TEXT,
    active     INTEGER DEFAULT 1,
    created_at TEXT    DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS labs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    test_name   TEXT    NOT NULL,
    result      TEXT    NOT NULL,
    unit        TEXT,
    normal_range TEXT,
    status      TEXT,
    lab_date    TEXT,
    notes       TEXT,
    created_at  TEXT    DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS chat_history (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,
    messages   TEXT    NOT NULL,
    updated_at TEXT    DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

module.exports = db;
