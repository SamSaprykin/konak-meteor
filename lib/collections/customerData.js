customerData = new Mongo.Collection("customerData")


Meteor.methods({
    customerData: function(dataAttributes) {
        var dataWithSameNumber = customerData.findOne({phoneNumber:dataAttributes.phoneNumber});
        if(dataAttributes.phoneNumber && dataWithSameNumber ) {
            throw new Meteor.Error(302,
                'This phone number has already been added',
                dataWithSameNumber._id);
        }

        var dataCust = _.extend(_.pick(dataAttributes,'firstName','lastName','email','phoneNumber','equiry'),{
            submitted: new Date().getDate()
        })

        var customerDataId = customerData.insert(dataCust);

        return customerDataId;
    }
})