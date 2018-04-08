Template.invest.events({
    'submit form': function(e){
        e.preventDefault()
        var dataCust = {
            firstName: $(e.target).find('[name=firstName]').val(),
            lastName: $(e.target).find('[name=lastName]').val(),
            email: $(e.target).find('[name=email]').val(),
            phoneNumber: $(e.target).find('[name=phoneNumber]').val(),
            equiry: $(e.target).find('[name=enquiry]').val()
        }

        Meteor.call('customerData',dataCust,function(error,id){
            if (error)
                return alert(error.reason);

            Router.go("homeIndex")
        })
        
        
        
        console.log("data inserted")
        
    }
})

Template.invest.onRendered( function() {
    $( ".form" ).validate({
        rules: {
            firstName: {
              required: true
            },
            lastName: {
              required: true
            },
            email: {
              required: true,
              email: true
            },
            phoneNumber: {
                required: true,
                number:true
            }
          },
          messages: {
            firstName: {
              required: "Need a first name here!"              
            },
            lastName: {
              required: "Don't forget last name!"
            },
            email: {
              required: "Please enter a valid email address.",
              email:"Your email address must be in the format of name@domain.com"
            },
            phoneNumber: {
               required: "Need a phone number to contact with You!",
               number:"Please enter the valid number"
            }
          }
    });
  });

