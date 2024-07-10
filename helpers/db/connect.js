// connect.js
import { MongoClient } from 'mongodb';

export class connect {
    static instanceConnect;
    db;
    user;
    port;
    cluster;
    #url;
    #host;
    #pass;
    #dbName;

    constructor({ host, user, pass, port, cluster, dbName } = {
        host: "mongodb+srv://",
        user: "0",
        pass: "SNDvRrA1WUG9xLv0",
        port: 47797,
        cluster: "cluster0.wxv8j9s.mongodb.net",
        dbName: "test"
        // mongodb+srv://0:SNDvRrA1WUG9xLv0@cluster0.wxv8j9s.mongodb.net/
    }) {
        if (connect.instanceConnect) {
            return connect.instanceConnect;
        }
        this.setHost = host;
        this.user = user;
        this.setPass = pass;
        this.port = port;
        this.cluster = cluster;
        this.setDbName = dbName;
        this.#open();
        connect.instanceConnect = this;
    }
    destructor(){
        connect.instanceConnect = undefined;
    }
    set setHost(host) {
        this.#host = host;
    }

    set setPass(pass) {
        this.#pass = pass;
    }

    set setDbName(dbName) {
        this.#dbName = dbName;
    }

    get getDbName() {
        return this.#dbName;
    }
    async reConnect() {
        await this.#open();
    }
    async #open() {
        console.log("Drive armado");
        this.#url = `${this.#host}${this.user}:${this.#pass}@${this.cluster}`;
        this.conexion = new MongoClient(this.#url);
        await this.conexion.connect();
        console.log("Conectado");
    }
}