module.exports.getDate=function()
{
    var today=new Date();

    var options ={
        month:"long",
        weekday:"long",
        day:"numeric"
    };
  
    return today.toLocaleDateString("en-US",options);
}
