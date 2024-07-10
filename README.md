# Consultas Blockbuster

1. **Contar el número total de copias de DVD disponibles en todos los registros:**

   ```javascript
   [
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
     }
   ]
   
   ```

2. **Encontrar todos los actores que han ganado premios Oscar:**

   ```javascript
   [
     {
       $unwind: "$awards"
     },
     {
       $match: {
         "awards.name": "Oscar Award"
       }
     }
   ]
   
   ```

3. **Encontrar la cantidad total de premios que ha ganado cada actor:**

   ```javascript
   [
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
   ]
   ```

4. **Obtener todos los actores nacidos después de 1980:**

   ```javascript
   [
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
   ]
   
   ```

5. **Encontrar el actor con más premios:**

   ```javascript
   [
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
   ]
   
   ```

6. **Listar todos los géneros de películas distintos:**

   ```javascript
   [
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
   ]
   	
   ```

7. **Encontrar películas donde el actor con id 1 haya participado:**

   ```javascript
   [
     {
       $match: {
         "character.id_actor": 1
       }
     }
   ]
   ```

8. **Calcular el valor total de todas las copias de DVD disponibles:**

   ```javascript
   [
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
   ]
   
   ```

9. **Encontrar todas las películas en las que John Doe ha actuado:**

   ```javascript
       [
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
       ]
   ```

10. **Encontrar el número total de actores en la base de datos:**

    ```javascript
    [
      {
        $count: 'Total actores'
      }
    ]
    ```

11. **Encontrar la edad promedio de los actores en la base de datos:**

    ```javascript
    [
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
    ]
    
    ```

12. **Encontrar todos los actores que tienen una cuenta de Instagram:**

    ```javascript
    [
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
    ]
    ```

13. **Encontrar todas las películas en las que participan actores principales:**

    ```javascript
    [
      {
        $match: {
          "character.rol": 'principal'
        }
      }
    ]
    ```

14. **Encontrar el número total de premios que se han otorgado en todas las películas:**

    ```javascript
    
    ```

15. **Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**

    ```javascript
    [
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
    ```

16. **Encontrar todas las películas de ciencia FicciÃ³n que tengan al actor con id 3:**

    ```javascript
    [
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
    ]
    ```

17. **Encontrar la película con más copias disponibles en formato DVD:**

    ```javascript
    [
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
    ]
    
    ```

18. **Encontrar todos los actores que han ganado premios después de 2015:**

    ```javascript
    [
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
    ]
    ```

19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**

    ```javascript
    [
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
    ]
    
    ```

20. **Encontrar todas las películas en las que el actor con id 2 haya participado:**

    ```javascript
    [
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
    ]
    ```

