// movis.js
import { connect } from "../../helpers/db/connect.js";

export class movis extends connect {
    static instanceMovis;
    db;
    collection;
    constructor() {
        if (movis.instanceMovis) {
            return movis.instanceMovis;
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection('Movies');
        movis.instanceMovis = this;
    }
    destructor(){
        movis.instanceMovis = undefined;
        connect.instanceConnect = undefined;
    }
    async getCountAllDVD() {
        await this.conexion.connect();
        const res = await this.collection.aggregate([
          {
              $unwind: "$format"
          },
          {
              $match: {
                  "format.name": "dvd"
              }
          },
          {
              $group: {
                  _id: null,
                  Total: {
                      $sum: "$format.copies"
                  }
              }
            },
            {
              $project: {
                _id: 0,
                 TotalCopiesDVD: "$Total"
             }
            }
          ]).toArray();
        await this.conexion.close();
        return res;
    }
    async getAllDiferentGenres(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $unwind: "$genre"
        },
        {
          $group: {
            _id: null,
            distinctGenres: { $addToSet: "$genre"}
          }
        },
        {
          $project: {
            _id: 0,
            distinctGenres: 1
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getAllfilmsByActor(){
      await this.conexion.connect();
      const res = await this.collection.aggregate( [
        {
          $match: {
            "character.id_actor": 1
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getTotalValueOfDVD(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $unwind: "$format"
        },
        {
          $match: {
            "format.name": "dvd"
          }
        },
        {
          $group: {
            _id: null,
            Total: {
              $sum: "$format.value"
            }
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getAllFilmsByJonhDoe(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $unwind: '$character'
        },
         {
          $lookup: {
            from: 'Autor',
            localField: 'character.id_actor',
            foreignField: 'id_actor',
            as: 'actor'
          }
        },
        {
          $match: {
            'actor.full_name': 'John Doe'
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getAllFilmsWIthMainCharacter(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $match: {
            "character.rol": 'principal'
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getAllFilmsCiFiWhenIdActor3Participated(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $unwind: '$character'
        },
        {
          $lookup: {
            from: 'Autor',
            localField: 'character.id_actor',
            foreignField: 'id_actor',
            as: 'actor'
          }
        },
          {
          $unwind: '$actor'
        },
        {
          $match: {
            genre: 'Ciencia FicciÃ³n',
            'actor.id_actor': 3
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getFilmWithMoreCopiesInDVDFormat(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $unwind: "$format"
        },
        {
          $match: {
            "format.name": "dvd"
          }
        },
        {
          $group: {
            _id: '$_id',
            film_name:{$first: '$name'},
            Total: {
                $sum: "$format.copies"
            }
          }
        },
        {
          $sort: {
            Total: -1
          }
        },
        {
          $limit: 1
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getTotalValueOfBluRay(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $unwind: "$format"
        },
        {
          $match: {
            "format.name": "Bluray"
          }
        },
        {
          $group: {
            _id: null,
            Total: {
              $sum: "$format.value"
            }
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
    async getAllFilmsWhereIdActor2Paticipated(){
      await this.conexion.connect();
      const res = await this.collection.aggregate([
        {
          $unwind: '$character'
        },
        {
          $lookup: {
            from: 'Autor',
            localField: 'character.id_actor',
            foreignField: 'id_actor',
            as: 'actor'
          }
        },
          {
          $unwind: '$actor'
        },
        {
          $match: {
            'actor.id_actor': 2
          }
        }
      ]).toArray();
      await this.conexion.close();
      return res;
    }
}