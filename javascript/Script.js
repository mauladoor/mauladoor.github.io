
    /* 

    
    then set the clicked tab to the modselected var

    if var1==var2 then add class widetab
    else remove showtab from the modselected var and then set it to the new tab and add showtab
    */
const tabobj={
        
        
        modselect:0,
        tabnames:["landing", "wip"],
        tabselects:[document.querySelector("#landing"), document.querySelector("#wip")],
        doubleclick:false,
        
        
        changeTabs(event){
            

            let targetselect=event.target;
            let newtabname=targetselect.className;
            let newtabselect;
            console.log(tabobj.newtabname);
        
            let tabidex=tabobj.tabnames.indexOf(newtabname);

            //if one of the previous 2 tabs clicked was the current tab
            if(tabidex>-1){
                newtabselect=tabobj.tabselects[tabidex];
                newtabselect.classList.add("double-clicked-tab");
                if(!tabobj.doubleclick){
                tabobj.tabselects[+(!tabidex)].classList.add("hide");
                }
                tabobj.tabnames=[newtabname, newtabname];
                tabobj.tabselects=[newtabselect, newtabselect];
                tabobj.doubleclick=true;
            }

            else{
                newtabselect=document.querySelector(`#${newtabname}`);

                if(!tabobj.doubleclick){
                tabobj.tabselects[0].classList.add("hide");}

                newtabselect.classList.remove("hide");
            
                tabobj.tabnames=[tabobj.tabnames[1],newtabname];
                tabobj.tabselects=[tabobj.tabselects[1], newtabselect];
                tabobj.doubleclick=false;
            }

            //either way, we record what this tab was and alternate for next time
            
            
            console.log(tabobj);   
        }
    }

    
    const changeTabs=tabobj.changeTabs;
    const navclicker=document.querySelector("nav");
    navclicker.addEventListener("click", changeTabs);








 const debug = false;
 const debugrid = false;

 const sprite_size=45;
/* 
 borders :[1,2,3,10,11,12,18,19] */


//viewboxes for each sprite in the spritesheets\


 const header_views ={viewboxes: ["0 -0.5 15 15", "17 -0.5 15 15", "34 -0.5 15 15", "51 -0.5 15 15", "68 -0.5 15 15", "85 -0.5 15 15", "102 -0.5 15 15", "119 -0.5 15 15", "136 -0.5 15 15", "0 16.5 15 15", "17 16.5 15 15", "34 16.5 15 15", "51 16.5 15 15", "68 16.5 15 15", "85 16.5 15 15", "102 16.5 15 15", "119 16.5 15 15", "136 16.5 15 15", "0 33.5 15 15"], center:[0,1]};

 const main_views = {viewboxes:["0 -0.5 15 15", "17 -0.5 15 15", "34 -0.5 15 15", "51 -0.5 15 15", "68 -0.5 15 15", "85 -0.5 15 15", "102 -0.5 15 15", "119 -0.5 15 15", "136 -0.5 15 15", "0 16.5 15 15", "17 16.5 15 15", "34 16.5 15 15", "51 16.5 15 15", "68 16.5 15 15", "85 16.5 15 15", "102 16.5 15 15", "119 16.5 15 15", "136 16.5 15 15", "0 33.5 15 15", "17 33.5 15 15", "34 33.5 15 15", "51 33.5 15 15", "68 33.5 15 15", "85 33.5 15 15", "102 33.5 15 15", "119 33.5 15 15", "136 33.5 15 15", "0 50.5 15 15", "17 50.5 15 15", "34 50.5 15 15", "51 50.5 15 15", "68 50.5 15 15", "85 50.5 15 15", "102 50.5 15 15", "119 50.5 15 15", "136 50.5 15 15", "0 67.5 15 15", "17 67.5 15 15", "34 67.5 15 15", "51 67.5 15 15", "68 67.5 15 15", "85 67.5 15 15", "102 67.5 15 15", "119 67.5 15 15", "136 67.5 15 15"], 
center :[0,9,18,19,20]};

const footer_views = {viewboxes:["0 -0.5 15 15", "17 -0.5 15 15", "34 -0.5 15 15", "51 -0.5 15 15", "68 -0.5 15 15", "85 -0.5 15 15", "102 -0.5 15 15", "119 -0.5 15 15", "136 -0.5 15 15", "0 16.5 15 15", "17 16.5 15 15", "34 16.5 15 15", "51 16.5 15 15", "68 16.5 15 15", "85 16.5 15 15", "102 16.5 15 15", "119 16.5 15 15", "136 16.5 15 15", "0 33.5 15 15", "17 33.5 15 15", "34 33.5 15 15", "51 33.5 15 15", "68 33.5 15 15", "85 33.5 15 15", "102 33.5 15 15", "119 33.5 15 15", "136 33.5 15 15", "0 50.5 15 15", "17 50.5 15 15", "34 50.5 15 15", "51 50.5 15 15", "68 50.5 15 15", "85 50.5 15 15", "102 50.5 15 15", "119 50.5 15 15", "136 50.5 15 15", "0 67.5 15 15", "17 67.5 15 15", "34 67.5 15 15", "51 67.5 15 15", "68 67.5 15 15", "85 67.5 15 15", "102 67.5 15 15", "119 67.5 15 15", "136 67.5 15 15"], 
center :[14,14]};


const views_array=[header_views, main_views, footer_views];

/* PRIMARY CLASS//////////////////////////////////////////////////////////////////////////////////////// */
class SVGrid{
    constructor(section_name, views_obj){
        this.sprite_px="60px";
        this.svghtml="";
        this.sprites=[];
        this.top_positioning=0;
        
        this.primary_svg=document.querySelector(`.${section_name}.svg`);
        this.section_name=section_name;
        this.viewboxes=views_obj.viewboxes;
        this.center_sprites=views_obj.center;
        this.sprite_div=`.${section_name}.svgrid-div`;
        this.spritesheet=section_name+"-spritesheet";
        this.svgridiv=document.querySelector(this.sprite_div)
        this.section=document.querySelector(section_name)
        this.center_sprites_arrlen=this.center_sprites.length;

        
        

    }
    
    /* resets the grid to fit the current docsize
    sets up the height variable for the element

    then calls
     setGridTemplates   
     procgen
     buildSVGridHtml */
    refreshGrid(width) {
        
        console.log("REFRESHING GRID");
        console.log(this.height);
        
        //determine what to do with extra height for main and possibly footer
        /* this.primary_svg.setAttribute("top", this.top_positioning.toString()); */
        /* this.svgridiv.setAttribute("top", this.top_positioning.toString()); */
        
        this.svgridiv.style.height = this.height+"px";
        this.svgridiv.style.width= width+'px';
        
          /*vvv not sure why i did this... for absolute positioning?vvv
        this.svgridiv.style.top = headerheight; */

        this.setGridTemplates();
      
        this.procgen();
        //reset svghtml to rebuild

        this.buildSVGridHtml();
        if(this.section_name!=="footer"){
        this.svgridiv.style.transform=`translateY(${this.top_positioning}px)`;
        }
        else{
            this.svgridiv.style.transform=`translateY(${this.top_positioning-10}px)`;
        }
        if(debugrid){
            console.log(this);
        }
this.svghtml="";
       
        
    }


    
 /* create a margin? */
 doSizeMath(colnums){
    this.resetSpriteProps();
    this.top_positioning=-this.height;
    this.rownums = Math.floor(this.height/sprite_size);
    this.colnums=colnums;

    if(debugrid){
      
        console.log(`${this.colnums} columns | ${this.rownums} rows = ${this.colnums*this.rownums} tiles` );
    }
 }

 resetSpriteProps(){
     this.svghtml="";
     this.svgridiv.innerHTML="";
     this.sprites=[];

 }


 //set style attribute of the sprite div with col and row templates
 setGridTemplates(){
/*     this.svgridiv.setAttribute("style",`grid-template-rows: repeat(${this.rownums}, ${this.sprite_px}); grid-template-columns: repeat(${this.colnums}, ${this.sprite_px})`); */
    
    this.svgridiv.setAttribute("style",`grid-template-rows: repeat(${this.rownums}, ${sprite_size}px); grid-template-columns: repeat(${this.colnums}, ${sprite_size}px)`);
    if(debugrid){
        console.log("step 1");
    }
}



//based on predefined patterns for the landscape we want to see, will return an array or arrays of semi random sprite view array indexes to be used when populating the grid div
procgen(){
    //maybe use map for this
    for(let coli=0; coli<this.colnums; coli++){
        for(let rowi=0; rowi<this.rownums; rowi++){
            this.sprites.push(this.center_sprites[getRandomInt(0, this.center_sprites_arrlen)]);
            
        } 
    }
    if(debugrid){
        console.log("step 2");
    }
}



/* IDEAS:
create predefined array of tile/sprites that would look good for different locations. 
(right now just arrays for the borders and centers, but maybe have an array of arrays to make groupings of compatible sprites choosable)

keep track of which numbers have been chosen somehow, perhaps removing them from the array temporarily so they arent chosen too much

create an array of the tiles for each border side and then one for the center

in buildsvggridhtml below, use either an assigned css class to set the specific positioned tilesets in place, or combine the arrays and let auto-flow handle everything
*/

buildSVGridHtml() {
    
   
   for(let sprite of this.sprites){
        this.svghtml+=`<svg viewBox="${this.viewboxes[sprite]}"  class="${this.section_name} sprite-svg"> <use class="${this.section_name} sprite-use" href="#${this.spritesheet}" ></use></svg>`
   }  

   this.svgridiv.innerHTML=this.svghtml;

   if(debugrid){
    console.log('sprites: '+this.sprites);
    console.log("BUILT SVGRID HTML");
}
   this.svghtml = "";
   
}



}

//the placement of the tiles will be incorrect if you don't refresh them enough
//though this may be counterable with specific grid placements for the borders

/* PRIMARY CLASS END//////////////////////////////////////////////////////////////////////////////////////// */



/* PRIMARY PROCESS//////////////////////////////////////////////////////////////////////////////////////// */

const resize_wait=300;
const hsvgrid=new SVGrid("header", views_array[0]);
const msvgrid= new SVGrid("main", views_array[1]);
const fsvgrid= new SVGrid("footer", views_array[2]);

const grid_objects=[hsvgrid, msvgrid, fsvgrid];

const sections=3;


    
//on startup
let win_width=window.innerWidth;

resizeWaiting(grid_objects, win_width);

for(let i=0; i<sections; i++){
    grid_objects[i].refreshGrid(win_width);
}
window.onresize = resizeDebounce();





//debounce so the grid doesnt refresh continuously as the window is resized
function resizeDebounce(){
    
    
    let timeout;

   

 return function(){

const after_resizing = () =>{

    clearTimeout(timeout);

    //actually refreshing the grids
    for(let i=0; i<sections; i++){
        
        grid_objects[i].refreshGrid(win_width);
}

};

clearTimeout(timeout);
timeout=setTimeout(after_resizing, resize_wait)

let win_width=window.innerWidth;
resizeWaiting(grid_objects, win_width);

 };
       
};     


function resizeWaiting(grid_objects, win_width){
    if(debug){
        console.log("resizewaiting working: "+grid_objects);
    }
    
    const colnums=Math.ceil(parseFloat(win_width)/sprite_size);
    let temptop=0;
    
    for(let i=0; i<sections; i++){  

        let tempgridobj=grid_objects[i];

        let tempheight=parseFloat(window.getComputedStyle(tempgridobj.section, null).getPropertyValue("height"));
        
        tempgridobj.height=tempheight;
        
        
        tempgridobj.doSizeMath(colnums, temptop);
        temptop+=tempheight;
        
        
        }
        


}

/* used to get a random sprite */
function getRandomInt(min, max) {
    
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

