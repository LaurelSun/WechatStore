/**
 * Created by Laurel Sun on 14/10/2015.
 */
var mongoHelper=require('../mongoose');

function Catagory(name,enable){
    this.name=name;
    this.enable=enable;
    this.a='a'
}



var CatagoryHelper=new mongoHelper("catagory",Catagory);
