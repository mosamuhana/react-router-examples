import localforage from 'localforage';

import { Note, CreateNote } from './types';

export async function getNotes(): Promise<Note[]> {
  const notes = await localforage.getItem<Note[]>('notes');
  if (!notes) return [];
  return notes;
}

export async function createNote({ title, content }: CreateNote) {
  const id = Math.random().toString(36).substring(2, 9);
  const note: Note = { id, title, content };
  const notes = await getNotes();
  notes.unshift(note);
  await set(notes);
  return note;
}

export async function getNote(id: string) {
  const notes = await getNotes();
  const note = notes.find((x) => x.id === id);
  return note ?? null;
}

export async function deleteNote(id: string) {
  const notes = await getNotes();
  const index = notes.findIndex((x) => x.id === id);
  if (index > -1) {
    notes.splice(index, 1);
    await set(notes);
    return true;
  }
  return false;
}

function set(notes: Note[]) {
  return localforage.setItem('notes', notes);
}
