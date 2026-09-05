import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data', 'db.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Initial Database Structure
const INITIAL_DB = {
  users: [],
  vitals: {},      // userId -> array of vitals logs
  medications: {}, // userId -> array of medications
  labs: {},        // userId -> array of lab reports
  chats: {}        // userId -> array of chat messages
};

export class Database {
  constructor() {
    this.data = INITIAL_DB;
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(content);
      } else {
        this.save();
      }
    } catch (err) {
      console.error('Error loading DB file, resetting:', err);
      this.data = INITIAL_DB;
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving DB file:', err);
    }
  }

  // User Operations
  findUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  createUser(user) {
    this.data.users.push(user);
    this.data.vitals[user.id] = [];
    this.data.medications[user.id] = [];
    this.data.labs[user.id] = [];
    this.data.chats[user.id] = [];
    this.save();
    return user;
  }

  // Health Vitals
  getVitals(userId) {
    return this.data.vitals[userId] || [];
  }

  addVital(userId, vital) {
    if (!this.data.vitals[userId]) this.data.vitals[userId] = [];
    this.data.vitals[userId].push(vital);
    this.save();
    return vital;
  }

  deleteVital(userId, vitalId) {
    if (!this.data.vitals[userId]) return false;
    this.data.vitals[userId] = this.data.vitals[userId].filter(v => v.id !== vitalId);
    this.save();
    return true;
  }

  // Medications
  getMedications(userId) {
    return this.data.medications[userId] || [];
  }

  addMedication(userId, med) {
    if (!this.data.medications[userId]) this.data.medications[userId] = [];
    this.data.medications[userId].push(med);
    this.save();
    return med;
  }

  deleteMedication(userId, medId) {
    if (!this.data.medications[userId]) return false;
    this.data.medications[userId] = this.data.medications[userId].filter(m => m.id !== medId);
    this.save();
    return true;
  }

  // Lab Reports
  getLabs(userId) {
    return this.data.labs[userId] || [];
  }

  addLab(userId, lab) {
    if (!this.data.labs[userId]) this.data.labs[userId] = [];
    this.data.labs[userId].unshift(lab);
    this.save();
    return lab;
  }

  // Chat Messages
  getChats(userId) {
    return this.data.chats[userId] || [];
  }

  saveChats(userId, messages) {
    this.data.chats[userId] = messages;
    this.save();
    return messages;
  }
}

export const db = new Database();
