import Database from 'better-sqlite3';

export class TestHelper {

    private static _instance: TestHelper;

    private constructor() {}

    public static get instance(): TestHelper {
        if(!this._instance) this._instance = new TestHelper();

        return this._instance;
    }

    private testdb!: any;

    async setupTestDB() {
      this.testdb = new Database(':memory:', { verbose: console.log });
    }

    teardownTestDB() {
      this.testdb.close();
    }
}

