/**
 * Created by Ankush on 4/10/2016.
 */


describe("Test Cases for Custom Component List", function(){
    it("Should test for Error when JSON URL isn't passed to constructor", function(){
        var context ={
            error:{
            }
        };
        try{
            var elem = new CustomList({});
        }catch(err){
            expect(err).toEqual("URL or JSON File Path is required!!");
        }
    });

    it("Should test if JSON is loaded properly", function(){
        var newsListContext ={};
        elem = new CustomList({JSONURL: "base/test/dummy.json" });
        elem.createElem();
    });

});
