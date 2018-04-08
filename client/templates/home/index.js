Template.homeIndex.helpers({
    headliners : function(){
        return Projects.headliners();
    },
    news : function(){
        return Allnews.show();
    }
})


