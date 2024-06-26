import {
  ApolloPersistOptions,
  PersistentStorage,
  PersistedData,
} from './types';

export default class Storage<T> {
  storage: PersistentStorage<PersistedData<T>>;
  key: string;

  constructor(options: Pick<ApolloPersistOptions<T>, 'storage' | 'key'>) {
    const { storage, key = 'apollo-cache-persist' } = options;

    this.storage = storage;
    this.key = key;
  }

  async read(): Promise<PersistedData<T>> {
    return this.storage.getItem(this.key);
  }

  async write(data: PersistedData<T>): Promise<void> {
    try {
      await this.storage.setItem(this.key, data);
    } catch (error) {
      console.log('Error writing data to storage:', error);
    }
  }

  async purge(): Promise<void> {
    await this.storage.removeItem(this.key);
  }

  async getSize(): Promise<number | null> {
    const data = await this.storage.getItem(this.key);

    if (data == null) {
      return 0;
    } else {
      return typeof data === 'string' ? data.length : null;
    }
  }
}
