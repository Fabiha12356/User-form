const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);


let form = document.querySelector("#form-valid");
console.log(form);





let subbutton = document.querySelector("button");
console.log(subbutton);



form.addEventListener("submit", async(e)=>{
e.preventDefault();


let flag = false;
let inputs = document.querySelectorAll("input");

inputs.forEach((input)=>{
    if(input.value === ""){
        flag = true
 
    }
})

if(flag){
    return;
}
let userDta =  new FormData(form)
console.log(userDta);
let userInfo = Object.fromEntries(userDta);
console.log(userInfo);

if(userInfo){
    Swal.fire({
  title: "Sign UP!",
  icon: "success",
  draggable: true
});
window.location.href = "/home.html"
}


let{emailid,firstname,lastname,address,course,dob,gender,city,password}= userInfo


try{
    const { error } = await client
  .from('Users-data')
  .insert({
    "name" : firstname,
    course,
    gender,
    dob,
    "fathername" : lastname,
    address,
  })
  console.log(error)
}
catch(error){
    console.log(error)
    if(error){
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});
    }
}



try{
    const { data, error } = await client.auth.signUp({
  "email": emailid,
  password,
})
}
catch(error){
    console.log(error)
}



})