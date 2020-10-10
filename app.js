// Required Files
const express=require("express");
const app=express();

const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://admin-omkar:oppoa37f@cluster0.usfdn.mongodb.net/toDOListDB",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify: false });
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const _=require("lodash");
// Main List

const itemsSchema={
    name:String
};

const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({
name:"Visit Store"
});

const item2=new Item({
    name:"Buy Fruits"
    });

    const item3=new Item({
        name:"Meet Harry"
        });

var defaultItems=[item1,item2,item3];



app.get("/",function(req,res){
Item.find({},function(err,dataFound){
    if(dataFound.length===0)
{
    Item.insertMany(defaultItems, function(err){
      });
    res.redirect("/");
} 
    else
    {
        res.render("index",{ejsTitle:"Today",ejsLists:dataFound});
    }
    });
});


// CustomList 

const customListSchema={
  name:String,
  items:[itemsSchema]
  };
  
  const List=mongoose.model("List",customListSchema);

app.get("/:customListName", function(req, res){
    const customListName =_.capitalize(req.params.customListName);
  
    List.findOne({name: customListName}, function(err, foundList){
      if (!err){
        if (!foundList){
          //Create a new list
          const list = new List({
            name: customListName,
            items: defaultItems
          });
          list.save();
          res.redirect("/" + customListName);
        } else {
          //Show an existing list
          res.render("index", {ejsTitle: foundList.name,ejsLists: foundList.items});
        }
      }
    });
  });


//  Post Request for Home
app.post("/",function(req,res){    
  var item=req.body.listItem;
 const listName=req.body.button;
    const itemName = new Item({
        name: item
      });   
    if(listName==="Today")
    {
        itemName.save();
        res.redirect("/");
    }
    else
    {
      List.findOne({name:listName},function(err,foundList){
        foundList.items.push(itemName);
        foundList.save();
        res.redirect("/" + listName);
      });
    }
});
// Post Request For Delete
app.post("/delete",function(req,res){
    const id=req.body.checkbox;
    const listName=req.body.listName;
    if(listName=="Today"){
      Item.findByIdAndRemove(id,function(err){
        if(!err)
        res.redirect("/");
    });
  }
    else{
    List.findOneAndUpdate({name:listName},{$pull: {items:{_id:id}}},function(err,foundList){
        if(!err)
        res.redirect("/"+listName);
    });  
    }
});
// Run Server
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
});