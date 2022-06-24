

let cl=console.log;


const stdInfo=document.getElementById("formInfo");
const fname=document.getElementById("fname");
const lname =document.getElementById("lname");
const contact=document.getElementById("contact");
const gmail=document.getElementById("gmail");
const stdData =document.getElementById("stdInfo")
const submitbtn =document.getElementById("submit")
const updatebtn =document.getElementById("update")










let newStdArr=[]

const onsubmitHandler=(e)=>{
    cl(e)
    e.preventDefault();
    let obj={
        firstName:fname.value,
        lastName:lname.value,
        contact:contact.value,
        gmail:gmail.value,
        id:uuid()
    }
    cl(obj)
    newStdArr.push(obj);
    localStorage.setItem("studentInfo",JSON.stringify( newStdArr));
    stdInfo.reset();
    templating( newStdArr);
};
function templating(arr){
    let result='';
    arr.forEach((ele,i)=>{
      result+=`
              <tr>
              <td>${i+1}</td>
              <td>${ele.firstName}</td>
              <td>${ele.lastName}</td>
              <td>${ele.contact}</td>
              <td>${ele.gmail}</td>
              <td> <button class="btn btn-success"data-id=${ele.id} onclick="onEditHandler(this)"> Edit</button></td>
              <td> <button class="btn btn-danger"data-id=${ele.id} onclick="onDeleteHandler(this)"> Delete</button></td>
              
              </tr>

      `        

    })
    stdData.innerHTML=result;
}

const onEditHandler=(e)=>{
    //  let getBtnId=e;
     let getid=e.dataset.id;
     cl(getid)
     localStorage.setItem('setId',getid)
    // cl(getBtnId.dataset.id);
    let getLocaldata=getDatafromLs();
    cl(getLocaldata)
    let getobj=getLocaldata.filter((ele)=> ele.id===getid);
    

    // cl( getobj);
    fname.value=getobj[0].firstName;
    lname.value=getobj[0].lastName;
    gmail.value=getobj[0].gmail;
    contact.value=getobj[0].contact;
    submitbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
};
const onupdateHandler=()=>{
   // cl("hello")
    let getId=localStorage.getItem('setId');
    cl(getId)
    let getLocaldata=getDatafromLs();
    cl(getLocaldata)
    getLocaldata.forEach(ele=>{
        if(ele.id===getId){
            ele.firstName=fname.value;
            ele.lastName=lname.value;
            ele.gmail=gmail.value;
            ele.contact=contact.value;
        }
    })
    localStorage.setItem("studentInfo",JSON.stringify(getLocaldata));
    templating( getLocaldata);
    stdInfo.reset();
    submitbtn.classList.remove('d-none');
    updatebtn.classList.add('d-none');

};
const onDeleteHandler=(e)=>{
    cl("delete....")
let getId=e.dataset.id;
cl(getId)
let getLocaldata=getDatafromLs();

cl(getLocaldata);
let deletData= getLocaldata.filter(ele=>{
   return ele.id!=getId;
   cl(deletData)

})
templating(deletData);
  localStorage.setItem("studentInfo",JSON.stringify(deletData));
 }


function getDatafromLs(){
    return JSON.parse(localStorage.getItem("studentInfo"));
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


if(getDatafromLs()){
    newStdArr=getDatafromLs();
 templating( newStdArr);
}


stdInfo.addEventListener("submit",onsubmitHandler);
updatebtn.addEventListener("click",onupdateHandler);