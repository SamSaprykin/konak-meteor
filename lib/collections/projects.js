Projects = new Mongo.Collection("projects")



Projects.headliners = function(){
    var headlinersSkus = ["KonakSeasideHomes","KonakSeasideResort","KonakTower","KonakCityTower","KonakSeasidePremium"]
    return Projects.find({sku: {$in : headlinersSkus}})
}







