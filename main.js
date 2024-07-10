// main.js
import { movis } from "./js/model/movis.js";
import { autor } from "./js/model/autor.js";

let obj;

obj = new movis();
// console.log(`1.Contar el número total de copias de DVD disponibles en todos los registros:`,await obj.getCountAllDVD());
// console.log(`6.Listar todos los géneros de películas distintos:`,await obj.getAllDiferentGenres());
// console.log(`7.Encontrar películas donde el actor con id 1 haya participado:`,await obj.getAllfilmsByActor());
// console.log(`8.Calcular el valor total de todas las copias de DVD disponibles:`,await obj.getTotalValueOfDVD());
// console.log(`9.Encontrar todas las películas en las que John Doe ha actuado:`,await obj.getAllFilmsByJonhDoe());
// console.log(`13.Encontrar todas las películas en las que participan actores principales:`,await obj.getAllFilmsWIthMainCharacter());
// console.log(`16.Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:`,await obj.getAllFilmsCiFiWhenIdActor3Participated());
// console.log(`17.Encontrar la película con más copias disponibles en formato DVD:`,await obj.getFilmWithMoreCopiesInDVDFormat());
// console.log(`19.Calcular el valor total de todas las copias de Blu-ray disponibles:`,await obj.getTotalValueOfBluRay());
// console.log(`20.Encontrar todas las películas en las que el actor con id 2 haya participado:`,await obj.getAllFilmsWhereIdActor2Paticipated());
obj.destructor();

obj = new autor();
console.log(`2.Encontrar todos los actores que han ganado premios Oscar:`, await obj.getAllAuthorswhoWonOscarAward());
console.log(`3.Encontrar la cantidad total de premios que ha ganado cada actor:`,await obj.getAllTotalAwardsWonEachActor());
console.log(`4.Obtener todos los actores nacidos después de 1980:`,await obj.getAllActorBornAfter1980());
console.log(`5.Encontrar el actor con más premios:`,await obj.getActorWithMostAwards());
console.log(`10.Encontrar el número total de actores en la base de datos:`,await obj.getAllTotalActorsInDataBase());
console.log(`11.Encontrar la edad promedio de los actores en la base de datos:`,await obj.getAverageAgeOfActors());
console.log(`12.Encontrar todos los actores que tienen una cuenta de Instagram:`,await obj.getAllActorWithIGAccount());
console.log(`15.Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:`,await obj.getAllFilmsWhenJohnDoeParticipedAndBluRayFormat());
console.log(`18.Encontrar todos los actores que han ganado premios después de 2015:`,await obj.getAllActorsWhoWonAwardsAfter2015());
obj.destructor();