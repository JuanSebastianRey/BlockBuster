// movis.js
import { connect } from "../../helpers/db/connect.js";

export class autor extends connect {
    static instanceAuthors;
    db;
    collection;
    constructor() {
        if (autor.instanceAuthors) {
            return autor.instanceAuthors;
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection('Autor');
        autor.instanceAuthors = this;
    }
    destructor(){
        autor.instanceAuthors = undefined;
        connect.instanceConnect = undefined;
    }
    async getAllAuthorswhoWonOscarAward(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $unwind: "$awards"
        },
        {
          $match: {
            "awards.name": "Oscar Award"
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getAllTotalAwardsWonEachActor(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $unwind: "$awards"
        },
        {
          $group: {
            _id: "$_id",
            name: {$first: "$full_name"},
            Total: {
              $sum: 1
            }
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getAllActorBornAfter1980(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $match: {
            "date_of_birth":{$gt: "1980"}
          }
        },
        {
          $project: {
            full_name:1,
            date_of_birth:1
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getActorWithMostAwards(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $unwind: "$awards"
        },
        {
          $group: {
            _id: "$_id",
            id_actor: { "$first": "$id_actor" },
            full_name: { "$first": "$full_name" },
            total_awards: { "$sum": 1 }
          }
        },
        {
          $sort: {
            total_awards: -1
          }
        },
        {
          $limit: 1
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getAllTotalActorsInDataBase(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $count: 'Total actores'
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getAverageAgeOfActors(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $addFields: {
            date_of_birth: {
              $dateFromString: {
                dateString: "$date_of_birth"
              }
            }
          }
        },
        {
          $addFields: {
            age: {
              $dateDiff: {
                startDate: "$date_of_birth",
                endDate    : "$$NOW",
                unit: "year"
              }
            }
          }
        },
        {
          $group: {
            _id: null,
            averageAge: { $avg: "$age" }
          }
        },
        {
          $project: {
            _id: 0,
            averageAge: 1
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getAllActorWithIGAccount(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $match: {
            "social_media.instagram": {$exists: true}
          }
        },
        {
          $project: {
            full_name: 1
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getAllFilmsWhenJohnDoeParticipedAndBluRayFormat(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $lookup: {
            from: "Movies",
            localField: "id_actor",
            foreignField:  "character.id_actor",
            as: "personaje"
          }
        },
        {
          $match: {
            "full_name": "John Doe",
            "personaje.format.name": "Bluray"
          }
        }
      ]
      ).toArray();
      await this.conexion.close();
      return res;
    }
    async getAllActorsWhoWonAwardsAfter2015(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $match: {
            "awards.year": {$gt: 2015}
          }
        },
        {
          $group: {
            _id: "$_id",
            name: {$first: "$full_name"}
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
  }