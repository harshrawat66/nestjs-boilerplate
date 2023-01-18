import { isArray } from 'class-validator';

export class Transformer {
  async shapeOf<T>(obj: T | T, keys: string[]): Promise<Array<Partial<T>> | Partial<T>> {
    if (isArray(obj)) {
      return this.handleArray(obj as T[], keys);
    }
    return this.handleObject(obj, keys);
  }

  async handleArray<T>(entities: T[], keys: string[]): Promise<Array<Partial<T>>> {
    const results: Array<Partial<T>> = [];
    for (let i = 0; i < entities.length; i++) {
      results.push(await this.transformObject(entities[i], keys));
    }
    return results;
  }

  async handleObject<T>(entity: T, keys: string[]): Promise<Partial<T>> {
    return this.transformObject(entity, keys);
  }

  private async transformObject<T>(entity: T, keys: string[]): Promise<Partial<T>> {
    const transformed: Partial<T> = {};
    Object.keys(entity).map((k) => {
      if (keys.includes(k)) {
        transformed[k] = entity[k];
      }
    });
    return transformed;
  }
}
