Projects = new Mongo.Collection("projects")



Projects.headliners = function(){
    var headlinersSkus = ["KonakSeasideHomes","KonakCityTower","KonakSeasidePremium","KonakSeasideResort","KonakTower"]
    return Projects.find({sku: {$in : headlinersSkus}})
}







