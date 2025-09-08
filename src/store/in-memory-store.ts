import { randomUUID } from "crypto";
import { IStore } from "./store.interface";

export class InMemoryStore<T extends { id?: string }> implements IStore<T> {
  private data = new Map<string, T>();

  async create(entity: T): Promise<T> {
    const id = entity.id ?? randomUUID();
    const now = new Date();
    const newEntity = { ...entity, id, createdAt: now, updatedAt: now } as T;
    this.data.set(id, newEntity);
    return newEntity;
  }


  async findAll(): Promise<T[]> {
    return Array.from(this.data.values());
  }

  async findById(id: string): Promise<T | null> {
    return this.data.get(id) || null;
  }

  async update(id: string, partial: Partial<T>): Promise<T | null> {
    const existing = this.data.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...partial };
    this.data.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.data.delete(id);
  }
}
