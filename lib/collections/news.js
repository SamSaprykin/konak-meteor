Allnews = new Mongo.Collection("Allnews")

Allnews.show = function(){
    var show = ["1","2","3"]
    return Allnews.find({id:{$in: show}})
}

Allnews.fullnews = function(){
    var showAll =["1","2","3","4","5","6"]
    return Allnews.find({id:{$in: showAll}})
}

